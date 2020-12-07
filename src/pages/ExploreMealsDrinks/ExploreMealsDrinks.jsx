import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMealsAPI, getDrinksApi } from '../../services/API';
import './ExploreMealsDrinks.css';

const ExploreMealsDrinks = (props) => {
  const { location: { pathname } } = props;
  const {
    pageTitle,
    recipes,
    setRecipes,
    setLoading,
  } = useContext(Context);
  const [randomId, setRandomId] = useState('');
  const zero = 0;

  useEffect(() => {
    if (pageTitle === 'Explorar Comidas') {
      setLoading(true);
      getMealsAPI('', 'random').then((data) => {
        setRecipes(data);
        setLoading(false);
      });
    }
    if (pageTitle === 'Explorar Bebidas') {
      setLoading(true);
      getDrinksApi('', 'random').then((data) => {
        setRecipes(data);
        setLoading(false);
      });
    }
  }, [pageTitle, setLoading, setRecipes]);

  useEffect(() => {
    if (recipes.length > zero && pageTitle === 'Explorar Comidas') {
      setRandomId(`/comidas/${recipes[zero].idMeal}`);
    }
    if (recipes.length > zero && pageTitle === 'Explorar Bebidas') {
      setRandomId(`/bebidas/${recipes[zero].idDrink}`);
    }
  }, [recipes, pageTitle]);

  return (
    <div>
      <Header pathname={ pathname } />
      {pathname !== '/receitas-feitas'
      && pathname !== '/receitas-favoritas'
      && <Footer pathname={ pathname } />}
      <div className="explore-container">
        <Link
          to={ `${pathname}/ingredientes` }
          data-testid="explore-by-ingredient"
        >
          <button type="button">Por Ingredientes</button>
        </Link>
        { pageTitle === 'Explorar Comidas' && (
          <Link
            to={ `${pathname}/area` }
            data-testid="explore-by-area"
          >
            <button type="button">Por Local de Origem</button>
          </Link>
        )}
        <Link
          to={ `${randomId}` }
          data-testid="explore-surprise"
        >
          <button type="button">Me Surpreenda!</button>
        </Link>
      </div>
    </div>
  );
};

ExploreMealsDrinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string,
};

ExploreMealsDrinks.defaultProps = {
  pathname: '/comidas',
};

export default ExploreMealsDrinks;
