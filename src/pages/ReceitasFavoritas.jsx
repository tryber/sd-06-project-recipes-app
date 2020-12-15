import React, { useContext, useEffect, useState } from 'react';
import { Header, CardFavorite } from '../components';
import ReceitasContext from '../context/ReceitasContext';

function ReceitasFeitas() {
  const { isFetching, setIsFetching, setTitleHeader, favoriteRecipes,
    setDisabledSearchIcon, setShowSearchBar } = useContext(ReceitasContext);

  useEffect(() => {
    setTitleHeader('Receitas Favoritas');
    setDisabledSearchIcon(true);
    setShowSearchBar(false);
    setIsFetching(true);
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filter, setFilter] = useState('All');
  const typeByFilter = { Foods: 'comida', Drinks: 'bebida' };
  const feitas = (filter === 'All') ? favoriteRecipes : favoriteRecipes
    .filter((recipe) => recipe.type === typeByFilter[filter]);

  return (
    <main className="receitas-container">
      <Header />
      <section className="receitas-body">
        <section className="receitas-filters">
          <section className="done-fav-container">
            <button
              data-testid="filter-by-all-btn"
              type="button"
              value="All"
              onClick={ () => setFilter('All') }
            >
              All
            </button>
            <button
              data-testid="filter-by-food-btn"
              type="button"
              value="Foods"
              onClick={ () => setFilter('Foods') }
            >
              Food
            </button>
            <button
              data-testid="filter-by-drink-btn"
              type="button"
              value="Drinks"
              onClick={ () => setFilter('Drinks') }
            >
              Drinks
            </button>
          </section>
        </section>
        <section className="cards-list">
          {isFetching && feitas === []
            ? <p>Nenhuma Receita Favorita</p>
            : (
              feitas.map((feita, idx) => (
                <CardFavorite
                  pageType="favorite-recipes"
                  key={ idx }
                  imagePath={ feita.image }
                  itemName={ feita.name }
                  id={ feita.id }
                  itemType={ `${feita.type}s` }
                  indexId={ idx }
                  cardType="horizontal"
                  area={ feita.area }
                  category={ feita.category }
                  alcoholic={ feita.alcoholicOrNot }
                  titlePage="Receitas Favoritas"
                  date={ feita.doneDate }
                />
              ))
            )}
        </section>
      </section>
    </main>
  );
}

export default ReceitasFeitas;
