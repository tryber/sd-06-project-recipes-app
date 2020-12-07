import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getMealsAPI, getDrinksApi } from '../../services/API';
import Context from '../../context/Context';
import IngredientCard from '../../components/IngredientCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './ExploreByIngredient.css';

const ExploreByIngredient = (props) => {
  const { location: { pathname } } = props;
  const {
    setLoading,
    ingredients,
    setIngredients,
    setPage,
  } = useContext(Context);

  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      setLoading(true);
      getMealsAPI('', 'list-all-ingredients').then((data) => {
        setIngredients(data);
        setLoading(false);
      });
      setPage('comidas');
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      setLoading(true);
      getDrinksApi('', 'list-all-ingredients').then((data) => {
        setIngredients(data);
        setLoading(false);
      });
      setPage('bebidas');
    }
  }, [pathname, setIngredients, setLoading, setPage]);

  return (
    <div>
      <Header pathname={ pathname } />
      <div className="ingredient-container">
        { ingredients && ingredients.map((ingredient, index) => {
          const maxCards = 12;
          while (index < maxCards) {
            return (
              <IngredientCard
                key={ index }
                ingredient={ ingredient }
                index={ index }
              />
            );
          }
          return undefined;
        })}
        <Footer />
      </div>
    </div>
  );
};

ExploreByIngredient.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string,
};

ExploreByIngredient.defaultProps = {
  pathname: '/comidas',
};

export default ExploreByIngredient;
