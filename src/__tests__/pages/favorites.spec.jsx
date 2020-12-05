import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';

import Favorites from '../../pages/Favorites';
import AppProvider from '../../hooks';

import LocalStorageFake from '../../fakes/localStorage';
import favoriteRecipes from '../../fakes/recipes/favorites';
import parseCategory from '../../fakes/utils/parseDesiredCategory';

let screen;
let localStorageFake;
let history;

describe('favorites page structure testing', () => {
  beforeEach(() => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Favorites />
        </AppProvider>
      </MemoryRouter>,
    );
  });

  it('should have the correct header', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Receitas Favoritas');

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should NOT have the navBar', () => {
    expect(screen.queryByTestId('drinks-bottom-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('food-bottom-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('explore-bottom-btn')).not.toBeInTheDocument();
  });
});

describe('favorites page logic testing', () => {
  beforeEach(() => {
    localStorageFake = new LocalStorageFake();

    localStorageFake.setItem('favoriteRecipes', favoriteRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Favorites />
        </AppProvider>
      </MemoryRouter>,
    );
  });

  it('should list all favorites recipes on screen', () => {
    favoriteRecipes.forEach((recipe, index) => {
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

      const shareBtn = screen.queryByTestId(`${index}-horizontal-share-btn`);
      expect(shareBtn).toBeInTheDocument();

      const favoriteBtn = screen.queryByTestId(`${index}-horizontal-favorite-btn`);
      expect(favoriteBtn).toBeInTheDocument();
    });
  });

  it('should un-favorite and remove the recipe if btn clicked', () => {
    const indexToRemove = 1;

    const itemName = favoriteRecipes[1].name;
    expect(screen.getByText(itemName)).toBeInTheDocument();

    const unfavoriteBtn = screen.queryByTestId(
      `${indexToRemove}-horizontal-favorite-btn`,
    );

    expect(unfavoriteBtn).toBeInTheDocument();

    fireEvent.click(unfavoriteBtn);

    expect(screen.queryByText(itemName)).not.toBeInTheDocument();

    const updatedFavorites = localStorageFake.store.favoriteRecipes;

    const recipeStillInFavorites = updatedFavorites.find(
      (recipe) => recipe.name === itemName,
    );

    expect(recipeStillInFavorites).toBeFalsy();
  });

  it('should filter recipes accordingly', () => {
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const filterByFood = screen.getByTestId('filter-by-food-btn');
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');

    favoriteRecipes.forEach((recipe, index) => {
      const recipeName = screen.queryByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.name);
    });

    fireEvent.click(filterByFood);

    favoriteRecipes.forEach((recipe) => {
      const recipeName = screen.queryByText(recipe.name);

      if (recipe.type === 'comida') {
        expect(recipeName).toBeInTheDocument();
      } else {
        expect(recipeName).not.toBeInTheDocument();
      }
    });

    fireEvent.click(filterByDrink);

    favoriteRecipes.forEach((recipe) => {
      const recipeName = screen.queryByText(recipe.name);

      if (recipe.type === 'bebida') {
        expect(recipeName).toBeInTheDocument();
      } else {
        expect(recipeName).not.toBeInTheDocument();
      }
    });

    fireEvent.click(allBtn);

    favoriteRecipes.forEach((recipe, index) => {
      const recipeName = screen.queryByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.name);
    });
  });
});

describe('favorite navigation', () => {
  beforeEach(() => {
    localStorageFake = new LocalStorageFake();

    localStorageFake.setItem('favoriteRecipes', favoriteRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    history = createMemoryHistory();

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Favorites />
        </AppProvider>
      </Router>,
    );
  });

  it('should navigate to details page when clicked on image', () => {
    favoriteRecipes.forEach((recipe, index) => {
      const recipeImg = screen.getByTestId(`${index}-horizontal-image`);

      fireEvent.click(recipeImg);

      const { pathname } = history.location;
      const expectedPath = `/${recipe.type}s/${recipe.id}`;
      expect(pathname).toBe(expectedPath);

      history.push('/receitas-favoritas');
    });
  });

  it('should navigate to details page when clicked on name', () => {
    favoriteRecipes.forEach((recipe, index) => {
      const recipeName = screen.getByTestId(`${index}-horizontal-name`);

      fireEvent.click(recipeName);

      const { pathname } = history.location;
      const expectedPath = `/${recipe.type}s/${recipe.id}`;
      expect(pathname).toBe(expectedPath);

      history.push('/receitas-favoritas');
    });
  });
});
