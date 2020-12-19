import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import Footer from '../components/Footer';

function Bebidas({ history }) {
  const {
    cards: {
      cardDrink,
    },
  } = useContext(RecipesAppContext);

  if (cardDrink.length === 1) {
    const { idDrink } = cardDrink[0];
    history.push(`/bebidas/${idDrink}`);
  }

  const buttonIs = true;
  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  return (
    <div>
      <Header name="Bebidas" button={ buttonIs } />
      <div>
        {cardDrink.slice(ofTheFirstParameter, upToParameter12).map(({
          idDrink,
          strDrink,
          strDrinkThumb,
        }, index) => (
          <Link
            key={ idDrink }
            to={ `/bebidas/${idDrink}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h4
              data-testid={ `${index}-card-name` }
            >
              { strDrink }
            </h4>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Bebidas;
