import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RevenueContext from '../context/RevenueContext';
import Foods from './Foods';
import Profile from './Profile';
import Explore from './Explore';
import ExploreFood from './ExploreFood';
import DoneRecipes from './DoneRecipes';
import FavoriteRecipes from './FavoriteRecipes';
import ExploreIngredient from './ExploreIngredient';
import ExploreArea from './ExploreArea';

export default function MainPage(props) {
  const { title } = props;
  const { setSearchButton, setSearch, setSearchParam } = useContext(RevenueContext);
  useEffect(() => {
    if (title === 'Comidas'
    || title === 'Bebidas'
    || title === 'Explorar Origem') {
      setSearchButton(false);
    }
    return () => {
      setSearchButton(true);
      setSearch(false);
    };
  }, []);

  let mainContent;
  let footerContent;
  switch (title) {
  case 'Comidas':
    setSearchParam('Meal');
    mainContent = <Foods />;
    footerContent = <Footer />;
    break;
  case 'Bebidas':
    setSearchParam('Drink');
    mainContent = <Foods />;
    footerContent = <Footer />;
    break;
  case 'Explorar':
    mainContent = <Explore />;
    footerContent = <Footer />;
    break;
  case 'Explorar Comidas':
    mainContent = <ExploreFood />;
    footerContent = <Footer />;
    break;
  case 'Explorar Bebidas':
    mainContent = <ExploreFood />;
    footerContent = <Footer />;
    break;
  case 'Explorar Ingredientes':
    mainContent = <ExploreIngredient />;
    footerContent = <Footer />;
    break;
  case 'Explorar Origem':
    mainContent = <ExploreArea />;
    footerContent = <Footer />;
    break;
  case 'Perfil':
    mainContent = <Profile />;
    footerContent = <Footer />;
    break;
  case 'Receitas Feitas':
    mainContent = <DoneRecipes />;
    break;
  case 'Receitas Favoritas':
    mainContent = <FavoriteRecipes />;
    break;
  default:
    break;
  }
  return (
    <div className="main-app">
      <Header title={ title } />
      <main>
        {mainContent}
      </main>
      {footerContent}
    </div>
  );
}

MainPage.propTypes = {
  title: PropTypes.string.isRequired,
};
