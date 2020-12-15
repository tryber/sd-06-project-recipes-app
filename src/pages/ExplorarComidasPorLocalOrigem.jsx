import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { fetchFood } from '../servicesAPI';
import { Header, Footer, Card } from '../components';

function ExplorarComidasPorLocalOrigem() {
  const { setDisabledSearchIcon, setRecipes, recipes,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const [areas, setAreas] = useState([]);
  const [filterArea, setFilterArea] = useState('');
  const twelve = 12;

  useEffect(() => {
    setDisabledSearchIcon(false);
    setTitleHeader('Explorar Origem');
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (filterArea === '' || filterArea === 'All')
        ? await fetchFood('itemName', '')
        : await fetchFood('filterByArea', filterArea);
      const areasOption = await fetchFood('byArea', '');
      setAreas(areasOption);
      setRecipes(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterArea]);

  return (
    <main className="comidas-container">
      <Header />
      <section className="comidas-body">
        <section className="comidas-origin">
          <select
            onChange={ ({ target }) => setFilterArea(target.value) }
            data-testid="explore-by-area-dropdown"
            className="comidas-select"
          >
            <option value="Pesquise por Area">Pesquise por Area</option>
            <option data-testid="All-option" value="All">All</option>
            {isFetching
              ? ''
              : areas.map((area, idx) => (
                <option
                  data-testid={ `${area.strArea}-option` }
                  key={ idx }
                  value={ area.strArea }
                >
                  {area.strArea}
                </option>
              ))}
          </select>
        </section>
        <section className="cards-list">
          {isFetching
            ? <h2>Loading...</h2>
            : recipes.map((meal, index) => (
              index < twelve ? <Card
                indexId={ index }
                key={ index }
                imagePath={ meal.strMealThumb }
                itemName={ meal.strMeal }
                id={ meal.idMeal }
                itemType="comidas"
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

export default ExplorarComidasPorLocalOrigem;
