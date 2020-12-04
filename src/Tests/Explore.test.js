import React from 'react';
import renderWithRouter from './renderWithRouter';
import Explorar from '../Pages/Explorar';

describe('Crie os elementos que devem respeitar os atributos descritos no protótipo',
  () => {
    it('Tem os data-testids explore-food e explore-drinks',
      () => {
        const { getByTestId } = renderWithRouter(<Explorar />);
        const FOOD = getByTestId('explore-food');
        const DRINK = getByTestId('explore-drinks');

        expect(FOOD).toBeInTheDocument();
        expect(DRINK).toBeInTheDocument();
      });

    it('O nomes dos botões devem ser "Explorar Comidas" e "Explorar Bebidas"',
      () => {
        const { getByTestId, getByText } = renderWithRouter(<Explorar />);
        const FOOD = getByTestId('explore-food');
        const FOOD_NAME = getByText('Explorar Comidas');
        const DRINK = getByTestId('explore-drinks');
        const DRINK_NAME = getByText('Explorar Bebidas');

        expect(FOOD).toBe(FOOD_NAME);
        expect(DRINK).toBe(DRINK_NAME);
      });

    it('O nomes dos botões devem ser "Explorar Comidas" e "Explorar Bebidas"',
      () => {
        const { getByTestId } = renderWithRouter(<Explorar />);
        const FOOD = getByTestId('explore-food');
        const DRINK = getByTestId('explore-drinks');

        expect(FOOD).toHaveAttribute('href', '/explorar/comidas');
        expect(DRINK).toHaveAttribute('href', '/explorar/bebidas');
      });
  });
