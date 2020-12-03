import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function ListaIngredientesEmProgresso({ recipe, type }) {
  const { setRecipesDone,
    recipesInProgress, setRecipesInProgress,
    isFetching, setIsFetching } = useContext(ReceitasContext);

  // Configuração de chaves e id conforme tipo da receita
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  const keyByType = (type === 'meal') ? 'meals' : 'cocktails';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  // Recebe as receitas em progresso do do estado global
  const recipesInProg = recipesInProgress;

  // Verificação se a receita está em progresso
  const recipesIsInProg = Object.keys(recipesInProg[keyByType])
    .find((recipeId) => recipeId === id) === id;

  // Criação do array de ingredientes com o controle checked
  const createIngredientList = () => {
    const keys = Object.keys(recipe);
    const ingredientsName = keys.reduce((array, key) => {
      const str = recipe[key];
      const condition = (key.includes('strIngredient') && str !== '' && str !== null);
      return (condition) ? array.concat(str) : array;
    }, []);

    const measures = keys.reduce((array, key) => {
      const str = (recipe[key] !== ' ' && recipe[key] !== null) ? recipe[key] : '';
      const condition = key.includes('strMeasure');
      return (condition) ? array.concat(str) : array;
    }, []);

    const ingredients = ingredientsName.map((name, index) => ({
      name,
      measure: measures[index],
      checked: false,
    }));

    return ingredients;
  };

  // Ao montar o componente
  useEffect(() => {
    setIsFetching(true);
    if (!recipesIsInProg) {
      setRecipesInProgress((prevState) => ({
        ...prevState,
        [keyByType]: {
          ...prevState[keyByType],
          [id]: createIngredientList(),
        },
      }));
    }
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ao finalizar receita atualiza o estado global e o local storage
  function finishRecipe() {
    setRecipesDone((prevState) => ([
      ...prevState,
      {
        id,
        type: type === 'meal' ? 'comida' : 'bebida',
        area: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: type === 'meal' ? '' : recipe.strAlcoholic,
        image: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}Thumb`],
        name: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}`],
        doneDate: recipe.dateModified,
        tags: (recipe.strTags !== null) ? recipe.strTags.split(',') : [],
      },
    ]));
    delete recipesInProgress[keyByType][id];
  }

  // Ao dar check atualiza o estado global e o local storage
  const check = ({ target }) => {
    const { value, checked } = target;
    const valueName = value.split('-medida-')[0];
    const valueMeasure = value.split('-medida-')[1];
    const isChecked = !(checked === false);
    const zero = 0;
    setRecipesInProgress((prevState) => {
      if (prevState) {
        const objIngThatContainsIngName = prevState[keyByType][id]
          .find((ingredient) => ingredient.name === valueName
            && ingredient.measure === valueMeasure);

        const ingredientIndex = prevState[keyByType][id]
          .indexOf(objIngThatContainsIngName);
        return ({
          ...prevState,
          [keyByType]: {
            ...prevState[keyByType],
            [id]: [
              ...prevState[keyByType][id].slice(zero, ingredientIndex),
              { ...prevState[keyByType][id][ingredientIndex], checked: isChecked },
              ...prevState[keyByType][id].slice(ingredientIndex + 1),
            ],
          },
        });
      }
    });
  };

  const list = (recipesIsInProg) ? recipesInProg[keyByType][id] : createIngredientList();

  const shouldDisable = list && list
    .map((ingredient) => ingredient.checked).includes(false);

  return (
    <div>
      {list ? (
        <div>
          <h4 className="detalhes-ingredients-title">Ingredientes</h4>
          <section className="detalhes-ingredients">
            {!isFetching && list
              .map((ingredient, index) => {
                const { name, measure, checked } = ingredient;
                return (
                  <label
                    key={ index }
                    htmlFor={ index }
                    data-testid={ `${index}-ingredient-step` }
                    className="ingredient"
                  >
                    <input
                      id={ index }
                      key={ index }
                      type="checkbox"
                      onChange={ ({ target }) => check({ target }, index) }
                      checked={ checked }
                      value={ `${name}-medida-${measure}` }
                    />
                    {`${name}${' -'}${'- '}${measure}`}
                  </label>
                );
              })}
          </section>
          <div>
            {list
            && (
              <Link className="detalhes-btn-link" to="/receitas-feitas">
                <button
                  className="detalhes-new-recipe-btn"
                  data-testid="finish-recipe-btn"
                  type="button"
                  onClick={ () => finishRecipe() }
                  disabled={ shouldDisable }
                >
                  Finalizar Receita
                </button>
              </Link>
            )}
            <Link className="detalhes-btn-link" to={ `/${urlByType}` }>
              <span className="detalhes-save-recipe-btn">Salvar Para Mais Tarde</span>
            </Link>
          </div>
        </div>
      ) : <div>loading</div>}
    </div>
  );
}

ListaIngredientesEmProgresso.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
};

export default ListaIngredientesEmProgresso;
