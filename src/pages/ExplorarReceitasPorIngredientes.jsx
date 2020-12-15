import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import { fetchDrink, fetchFood } from '../servicesAPI';
import { Header, Footer } from '../components';

function ExplorarReceitasPorIngredientes({ match }) {
  const { setDisabledSearchIcon, setFilterIngredient,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const [ingredientes, setIngredientes] = useState([]);
  const twelve = 12;

  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';
  const srcByType = (type === 'meal') ? 'meal' : 'cocktail';
  const propStrIngredient = (type === 'meal') ? 'strIngredient' : 'strIngredient1';

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Ingredientes');
    setShowSearchBar(false);
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (type === 'meal')
        ? await fetchFood('listIngredient', '')
        : await fetchDrink('listIngredient', '');
      setIngredientes(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={ `${urlByType}-container` }>
      <Header />
      <section className={ `${urlByType}-body` }>
        <section className="cards-list">
          {isFetching
            ? <h2>Loading...</h2>
            : ingredientes.map((ingredient, index) => (
              index < twelve
                ? (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <div className="recomended-datails-ingredient">
                      <Link
                        className="recomended-details-link"
                        to={ `/${urlByType}` }
                        onClick={ () => setFilterIngredient(
                          ingredient[propStrIngredient],
                        ) }
                      >
                        <div className="recomended-img-body">
                          <img
                            data-testid={ `${index}-card-img` }
                            alt="recipe cover"
                            className="recomended-image"
                            src={ `https://www.the${srcByType}db.com/images/ingredients/${ingredient[propStrIngredient]}-Small.png` }
                          />
                        </div>
                        <div
                          className="recomended-info"
                        >
                          <h4
                            data-testid={ `${index}-card-name` }
                            className="recomended-title"
                          >
                            {ingredient[propStrIngredient]}
                          </h4>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
                : null
            ))}
        </section>
      </section>
      <Footer />
    </main>
  );
}

ExplorarReceitasPorIngredientes.propTypes = {
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

export default ExplorarReceitasPorIngredientes;
