import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';

import DoneRecipes from '../../pages/DoneRecipes';
import AppProvider from '../../hooks';

import LocalStorageFake from '../../fakes/localStorage';
import doneRecipes from '../../fakes/recipes/done';
import parseCategory from '../../fakes/utils/parseDesiredCategory';

let screen;
let localStorageFake;
let history;

describe('done recipes page structure testing', () => {
  beforeEach(() => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <DoneRecipes />
        </AppProvider>
      </MemoryRouter>,
    );
  });

  it('should have the correct header', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Receitas Feitas');

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should NOT have the navBar', () => {
    expect(screen.queryByTestId('drinks-bottom-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('food-bottom-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('explore-bottom-btn')).not.toBeInTheDocument();
  });
});

describe('done recipes page logic testing', () => {
  beforeEach(() => {
    localStorageFake = new LocalStorageFake();

    localStorageFake.setItem('doneRecipes', doneRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    screen = render(
      <MemoryRouter>
        <AppProvider>
          <DoneRecipes />
        </AppProvider>
      </MemoryRouter>,
    );
  });

  it('should list all done recipes on screen correctly', () => {
    doneRecipes.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-horizontal-image`);
      expect(recipeImg).toBeInTheDocument();
      expect(recipeImg).toHaveAttribute('src', recipe.image);

      const recipeName = screen.queryByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.name);

      const recipeInfo = screen.queryByTestId(`${index}-horizontal-top-text`);
      expect(recipeInfo).toBeInTheDocument();

      const desiredInfo = parseCategory(recipe.type, {
        category: recipe.category,
        area: recipe.area,
        alcoholicOrNot: recipe.alcoholicOrNot,
      });

      expect(recipeInfo).toHaveTextContent(desiredInfo);

      const doneDate = screen.queryByTestId(`${index}-horizontal-done-date`);
      expect(doneDate).toBeInTheDocument();

      const shareBtn = screen.queryByTestId(`${index}-horizontal-share-btn`);
      expect(shareBtn).toBeInTheDocument();
    });
  });

  it('should have 2 tags if type is food', () => {
    doneRecipes.forEach((recipe, index) => {
      if (recipe.type === 'comida') {
        recipe.tags.forEach((tag, tagIndex) => {
          const tagLimit = 2;
          const tagElement = screen.queryByTestId(`${index}-${tag}-horizontal-tag`);

          if (tagIndex < tagLimit) {
            expect(tagElement).toBeInTheDocument();
            expect(tagElement).toHaveTextContent(tag);
          } else {
            expect(tagElement).not.toBeInTheDocument();
          }
        });
      }
    });
  });

  it('should filter recipes accordingly', () => {
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const filterByFood = screen.getByTestId('filter-by-food-btn');
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');

    doneRecipes.forEach((recipe, index) => {
      const recipeName = screen.queryByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.name);
    });

    fireEvent.click(filterByFood);

    doneRecipes.forEach((recipe) => {
      const recipeName = screen.queryByText(recipe.name);

      if (recipe.type === 'comida') {
        expect(recipeName).toBeInTheDocument();
      } else {
        expect(recipeName).not.toBeInTheDocument();
      }
    });

    fireEvent.click(filterByDrink);

    doneRecipes.forEach((recipe) => {
      const recipeName = screen.queryByText(recipe.name);

      if (recipe.type === 'bebida') {
        expect(recipeName).toBeInTheDocument();
      } else {
        expect(recipeName).not.toBeInTheDocument();
      }
    });

    fireEvent.click(allBtn);

    doneRecipes.forEach((recipe, index) => {
      const recipeName = screen.queryByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.name);
    });
  });
});

describe('done recipes navigation', () => {
  beforeEach(() => {
    localStorageFake = new LocalStorageFake();

    localStorageFake.setItem('doneRecipes', doneRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    const componentPath = '/receitas-favoritas';
    history = createMemoryHistory({
      initialEntries: [componentPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <DoneRecipes />
        </AppProvider>
      </Router>,
    );
  });

  it('should navigate to details page when clicked on image', () => {
    doneRecipes.forEach((recipe, index) => {
      const recipeImg = screen.getByTestId(`${index}-horizontal-image`);

      fireEvent.click(recipeImg);

      const { pathname } = history.location;
      const expectedPath = `/${recipe.type}s/${recipe.id}`;
      expect(pathname).toBe(expectedPath);

      history.push('/receitas-favoritas');
    });
  });

  it('should navigate to details page when clicked on name', () => {
    doneRecipes.forEach((recipe, index) => {
      const recipeName = screen.getByTestId(`${index}-horizontal-name`);

      fireEvent.click(recipeName);

      const { pathname } = history.location;
      const expectedPath = `/${recipe.type}s/${recipe.id}`;
      expect(pathname).toBe(expectedPath);

      history.push('/receitas-favoritas');
    });
  });
});
