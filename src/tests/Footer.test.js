import React from 'react';
import { fireEvent } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testing  footer.js', () => {
  it('testando se tem o botão de imagem de bebidas', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const dataTest = getByTestId('drinks-bottom-btn');
    expect(dataTest).toBeInTheDocument();
  });
  it('testando se tem o botão de imagem de comidas', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const dataTest = getByTestId('food-bottom-btn');
    expect(dataTest).toBeInTheDocument();
  });
  it('testando se tem o botão de imagem de explorar', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const dataTest = getByTestId('explore-bottom-btn');
    expect(dataTest).toBeInTheDocument();
  });
  it('testeando se o botão de bebidas leva a pagina de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer pathname="/comidas" />);

    const drinksButton = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksButton);

    expect(drinksButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/bebidas');
  });

  it('testeando se o botão de bebidas leva a pagina de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer pathname="/comidas" />);

    const exploreButton = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreButton);

    expect(exploreButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/explorar');
  });

  it('testeando se o botão de comidas leva a pagina de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer pathname="/bebidas" />);

    const foodButton = getByTestId('food-bottom-btn');
    fireEvent.click(foodButton);

    expect(foodButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/comidas');
  });

  it('testeando se tem footer na paginas de bebidas', () => {
    const { getByTestId } = renderWithRouter(<Footer pathname="/explorar" />);

    const dataTest = getByTestId('footer');
    expect(dataTest).toBeInTheDocument();
  });
});
