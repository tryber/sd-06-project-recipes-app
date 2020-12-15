import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import { Recomended, ListaIngredientes, FavoriteShareButtons } from '../components';
import { fetchDrink, fetchFood } from '../servicesAPI';

function ReceitaDetalhada({ match }) {
  const { setIsFetching, isFetching, keyProps,
    setRecipeGlobal } = useContext(ReceitasContext);
  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const [recipe, setRecipe] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (type === 'meal')
        ? await fetchFood('byId', id)
        : await fetchDrink('byId', id);
      setRecipe(...response);
      setRecipeGlobal(...response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <main className="detalhes-main">
      {isFetching
        ? <h2>Loading...</h2>
        : (
          <section>
            <header className="detalhes-header">
              <section className="detalhes-img">
                <section className="detalhes-img-border">
                  <img
                    data-testid="recipe-photo"
                    src={ recipe[`str${keyProps[type]}Thumb`] }
                    alt=""
                  />
                </section>
              </section>
              <section className="detalhes-bar">
                <h3 data-testid="recipe-title" className="detalhes-title">
                  { recipe[`str${keyProps[type]}`] }
                </h3>
                <h4 data-testid="recipe-category" className="detalhes-subtitle">
                  { recipe[type === 'meal' ? 'strCategory' : 'strAlcoholic'] }
                </h4>
                <FavoriteShareButtons recipeId={ id } type={ type } />
              </section>
            </header>
            <article className="detalhes-article">
              <ListaIngredientes recipe={ recipe } type={ type } />
              <hr />
              <section className="detalhes-instructions-container">
                <h4 className="detalhes-titles">Instruções de preparo</h4>
                <section className="detalhes-instructions">
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                  {type === 'meal' && (
                    <section className="detalhes-video">
                      <iframe
                        title={ `Como Fazer ${recipe[`str${keyProps[type]}`]}` }
                        data-testid="video"
                        width="560"
                        height="315"
                        src={ !recipe.strYoutube
                          ? <h2>Loading...</h2>
                          : recipe.strYoutube.replace('watch?v=', 'embed/') }
                        frameBorder="0"
                        allow="accelerometer;
                          encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </section>
                  )}
                </section>
              </section>
              <hr />
              <h4 className="detalhes-titles">Recomendações de acompanhamento</h4>
              <section className="detalhes-list-recomended">
                <Recomended itemType={ type === 'meal' ? 'bebidas' : 'comidas' } />
              </section>
            </article>
          </section>
        )}
    </main>
  );
}

ReceitaDetalhada.propTypes = {
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

export default ReceitaDetalhada;
