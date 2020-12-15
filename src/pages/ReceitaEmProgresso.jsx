import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ListaIngredientesEmProgresso, FavoriteShareButtons } from '../components';
import ReceitasContext from '../context/ReceitasContext';
import { fetchDrink, fetchFood } from '../servicesAPI';

function ReceitaEmProgresso({ match }) {
  const { setIsFetching, isFetching, keyProps,
    setRecipeGlobal, recipesDone } = useContext(ReceitasContext);
  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';
  const { id } = match.params;
  const isDone = recipesDone.find((recipeDone) => recipeDone.id === id);
  const [recipe, setRecipe] = useState([]);

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
    if (!isDone) firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstRender = (isDone)
    ? <Redirect to={ `/${urlByType}/${id}` } />
    : <h2>Loading...</h2>;

  return (
    <main className="detalhes-main">
      {isFetching
        ? firstRender
        : (
          <div>
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
              { recipe !== '' ? (
                <ListaIngredientesEmProgresso recipe={ recipe } type={ type } />
              ) : <p>Loading...</p>}
              <hr />
              <section className="detalhes-instructions-container">
                <h4 className="detalhes-titles">Instruções de preparo</h4>
                <section className="detalhes-instructions">
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                </section>
              </section>
            </article>
          </div>
        )}
    </main>
  );
}

ReceitaEmProgresso.propTypes = {
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

export default ReceitaEmProgresso;
