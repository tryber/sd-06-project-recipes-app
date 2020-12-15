import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import { fetchDrink, fetchFood } from '../servicesAPI';
import { Header, Footer, Categories, Card } from '../components';

function ReceitasB({ history, match }) {
  const { recipes, setRecipes, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching, searchType,
    searchInput, filterRecipe,
    filterIngredient } = useContext(ReceitasContext);
  const twelve = 12;

  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';
  const categoryType = (type === 'meal') ? 'meals' : 'drinks';
  const titleByType = (type === 'meal') ? 'Comidas' : 'Bebidas';
  const prefixByType = (type === 'meal') ? 'Meal' : 'Drink';

  useEffect(() => {
    setDisabledSearchIcon(false);
    setTitleHeader(titleByType);
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterRecipe) {
      setIsFetching(true);
      const firstRequestAPI = async () => {
        let response;
        if (type === 'meal') {
          response = (filterRecipe === '' || filterRecipe === 'All')
            ? await fetchFood('itemName', '')
            : await fetchFood('byCategory', filterRecipe);
        } else {
          response = (filterRecipe === '' || filterRecipe === 'All')
            ? await fetchDrink('itemName', '')
            : await fetchDrink('byCategory', filterRecipe);
        }
        setRecipes(response);
        setIsFetching(false);
      };
      firstRequestAPI();
    } else {
      setIsFetching(true);
      const firstRequestAPI = async () => {
        const responseFood = (filterIngredient === '')
          ? await fetchFood('itemName', '')
          : await fetchFood('ingredient', filterIngredient);
        const responseDrink = (filterIngredient === '')
          ? await fetchDrink('itemName', '')
          : await fetchDrink('ingredient', filterIngredient);
        const response = (type === 'meal') ? responseFood : responseDrink;
        setRecipes(response);
        setIsFetching(false);
      };
      firstRequestAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRecipe, filterIngredient]);

  return (
    <main className={ `${urlByType}-container` }>
      <header>
        <Header
          requestAPI={ async () => {
            const response = (type === 'meal')
              ? await fetchFood(searchType, searchInput)
              : await fetchDrink(searchType, searchInput);
            if (response && response.length === 1) {
              history.push(`/${urlByType}/${response[0][`id${prefixByType}`]}`);
            }
            if (response) {
              setRecipes(response);
            } else {
              // eslint-disable-next-line no-alert
              alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
            }
          } }
        />
      </header>
      <section className={ `${urlByType}-body` }>
        <section className={ `${urlByType}-filters` }>
          <Categories type={ categoryType } />
        </section>
        <section className="cards-list">
          {isFetching
            ? <h2>Loading...</h2>
            : recipes.map((eachRecipe, index) => (
              index < twelve ? <Card
                indexId={ index }
                key={ index }
                imagePath={ eachRecipe[`str${prefixByType}Thumb`] }
                itemName={ eachRecipe[`str${prefixByType}`] }
                id={ eachRecipe[`id${prefixByType}`] }
                itemType={ urlByType }
                cardType="recipe"
              />
                : null
            ))}
        </section>
      </section>
      <Footer />
    </main>
  );
}

ReceitasB.propTypes = {
  history: propTypes.shape().isRequired,
  match: propTypes.shape().isRequired,
};

export default ReceitasB;
