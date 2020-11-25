import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import RecipesProvider from '../provider/RecipesProvider';

test('Teste SearchBar', () => {
  const { getByText } = render(
    <RecipesProvider>
      <SearchBar />
    </RecipesProvider>,
  );
  const textBar = getByText(/Barra de Busca/i);
  const searchBarInput = screen.getByTestId('search-input');
  const ingredienSearchtRadio = screen.getByTestId('ingredient-search-radio');
  const nameSearchRadio = screen.getByTestId('name-search-radio');
  const firstSearchRadio = screen.getByTestId('first-letter-search-radio');
  expect(textBar).toBeInTheDocument();
  expect(searchBarInput).toBeInTheDocument();
  expect(ingredienSearchtRadio).toBeInTheDocument();
  expect(nameSearchRadio).toBeInTheDocument();
  expect(firstSearchRadio).toBeInTheDocument();
});
