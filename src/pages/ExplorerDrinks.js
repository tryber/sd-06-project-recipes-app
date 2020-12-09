import React from 'react';
import PropTypes from 'prop-types';
import { Footer, HeaderNoSearch } from '../components';
import { fetchRandom } from '../helpers/Helper';

export default function ExplorerDrinks(props) {
  return (
    <section>
      <HeaderNoSearch id="Explorar Bebidas" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => props.history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={
            async () => props.history.push(`/bebidas/${await fetchRandom('bebida')}`)
          }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </section>
  );
}

ExplorerDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
