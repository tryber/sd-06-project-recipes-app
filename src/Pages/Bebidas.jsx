import React, { useContext, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

import CategoriesBebidas from '../components/Categories/indexBebidas';

import { showSugestedDrinks,
  showAllDrinksCategories,
} from '../services/aPI';

import ContextAPI from '../Context/ContextAPI';

const Bebidas = () => {
  const { setApiValueSearch, apiValueSearch, setCategories } = useContext(ContextAPI);

  const getSugestedDrinks = async () => {
    const drinks = await showSugestedDrinks();
    const result = await showAllDrinksCategories();
    setCategories(result);
    setApiValueSearch({
      ...apiValueSearch,
      drinks,
    });
  };
  useEffect(() => {
    getSugestedDrinks();
  }, []);

  return (
    <div>
      <Header />
      <CategoriesBebidas />
      <Cards />
      <Footer />
    </div>
  );
};

export default Bebidas;
