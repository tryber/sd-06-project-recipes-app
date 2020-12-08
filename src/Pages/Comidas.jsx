import React, { useEffect, useContext } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Categories from '../components/Categories/indexComidas';
import ContextAPI from '../Context/ContextAPI';

import { showAllFoodsCategories,
  showSugestedFoods,
} from '../services/aPI';

const Comidas = () => {
  const { setApiValueSearch, apiValueSearch, setCategories } = useContext(ContextAPI);

  const getSugestedFoods = async () => {
    const foods = await showSugestedFoods();

    setApiValueSearch({
      ...apiValueSearch,
      foods,
    });
  };

  const categoriesDefined = async () => {
    if (window.location.pathname === '/comidas') {
      getSugestedFoods();
      const result = await showAllFoodsCategories();
      setCategories(result);
    }
  };

  useEffect(() => {
    categoriesDefined();
  }, []);

  return (
    <div>
      <Header />
      <Categories />
      <Cards />
      <Footer />
    </div>
  );
};

export default Comidas;
