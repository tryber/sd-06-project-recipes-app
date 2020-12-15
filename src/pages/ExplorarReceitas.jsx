import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import { fetchDrink, fetchFood } from '../servicesAPI';
import { Header, Footer } from '../components';

function ExplorarReceitas({ match }) {
  const { setDisabledSearchIcon, setIsFetching, isFetching,
    setTitleHeader, setShowSearchBar,
  } = useContext(ReceitasContext);
  const [randomId, setRandomId] = useState('');

  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';
  const titleByType = (type === 'meal') ? 'Explorar Comidas' : 'Explorar Bebidas';

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader(titleByType);
    setShowSearchBar(false);
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (type === 'meal')
        ? await fetchFood('random', '')
        : await fetchDrink('random', '');
      setRandomId(response[0][(type === 'meal') ? 'idMeal' : 'idDrink']);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="explorar-container">
      <Header />
      <section className="explorar-body">
        <Link
          data-testid="explore-by-ingredient"
          to={ `/explorar/${urlByType}/ingredientes` }
          className={ `explorar-${urlByType}-link` }
        >
          Por Ingredientes
        </Link>
        {type === 'meal'
          && (
            <Link
              data-testid="explore-by-area"
              to={ `/explorar/${urlByType}/area` }
              className={ `explorar-${urlByType}-link` }
            >
              Por Local de Origem
            </Link>
          )}
        {!isFetching
          ? (
            <Link
              data-testid="explore-surprise"
              to={ `/${urlByType}/${randomId}` }
              className={ `explorar-${urlByType}-link` }
            >
              Me Surpreenda!
            </Link>)
          : null}
      </section>
      <Footer />
    </section>
  );
}

ExplorarReceitas.propTypes = {
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.shape({
      id: propTypes.string,
      path: propTypes.string,
      url: propTypes.string,
    }),
    path: propTypes.string,
    url: propTypes.string,
  }).isRequired,
};

export default ExplorarReceitas;
