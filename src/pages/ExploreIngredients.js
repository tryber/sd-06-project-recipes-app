import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/Footer';
import ExploreCard from '../components/explore/ExploreCard';
import { fetchMealIngredients, fetchDrinkIngredients } from '../services';
import '../components/explore/Explore.css';

const ZERO = 0;
const TWELVE = 12;

function ExploreFoodIngredients({ type }) {
  const [ingredients, setIngredients] = useState([]);

  const ingName = (type === 'comidas')
    ? 'strIngredient'
    : 'strIngredient1';

  const fetchIngredients = async () => {
    const list = (type === 'comidas')
      ? (await fetchMealIngredients()).meals
      : (await fetchDrinkIngredients()).drinks;

    setIngredients(list.slice(ZERO, TWELVE));
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <section className="container-ingredientes">
        {
          ingredients.map((el, index) => (
            <ExploreCard
              key={ index }
              index={ index }
              name={ el[ingName] }
              type={ type }
            />
          ))
        }
      </section>
      <Footer />
    </>
  );
}

ExploreFoodIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreFoodIngredients;
