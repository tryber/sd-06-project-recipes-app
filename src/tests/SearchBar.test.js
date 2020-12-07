import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';

describe('13 - Implemente os elementos da barra de busca', () => {
  it('1. O input de busca deve possuir o atributo data-testid=search-input', () => {
    const { getByTestId } = renderWithRouter(<SearchBar />);
    const dataTest = getByTestId('search-input');
    expect(dataTest).toBeInTheDocument();
  });

  it('2. O radio button de ingrediente deve possuir o atributo especifico', () => {
    const { getByTestId } = renderWithRouter(<SearchBar />);
    const dataTest = getByTestId('ingredient-search-radio');
    expect(dataTest).toBeInTheDocument();
  });

  it('3. O radio button da primeira letra deve possuir o atributo especifico', () => {
    const { getByTestId } = renderWithRouter(<SearchBar />);
    const dataTest = getByTestId('ingredient-search-radio');
    expect(dataTest).toBeInTheDocument();
  });

  it('4. O radio button do nome deve possuir o atributo especifico', () => {
    const { getByTestId } = renderWithRouter(<SearchBar />);
    const dataTest = getByTestId('ingredient-search-radio');
    expect(dataTest).toBeInTheDocument();
  });

  it('5. O botão de busca deve possuir o atributo especifico', () => {
    const { getByTestId } = renderWithRouter(<SearchBar />);
    const dataTest = getByTestId('exec-search-btn');
    expect(dataTest).toBeInTheDocument();
  });
});
