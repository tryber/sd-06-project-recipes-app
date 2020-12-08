import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchMeal from '../services/fetchMeal';
import Context from '../context/Context';
import ExploreRecipeCard from '../components/ExploreCard';

function IngredientsArea() {
  const TRUE = true;
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const { recipes, recipesToRenderByArea } = useContext(Context);

  const fetchAreas = async () => {
    const fetchedAreas = await fetchMeal('allAreas');
    setAreas(fetchedAreas.map(({ strArea }) => strArea));
  };

  useEffect(() => {
    fetchAreas();
    recipesToRenderByArea();
  }, []);

  useEffect(() => {
    recipesToRenderByArea(selectedArea);
  }, [selectedArea]);

  return (
    <div>
      <Header title="Explorar Origem" search={ TRUE } />
      <select
        data-testid="explore-by-area-dropdown"
        value={ selectedArea }
        onChange={ (e) => setSelectedArea(e.target.value) }
      >
        <option key="disabled" disabled value="">--</option>
        <option key="All" data-testid="All-option" value="All">All</option>
        {areas.map((area) => (
          <option key={ area } data-testid={ `${area}-option` }>{`${area}`}</option>))}
      </select>
      <div className="recipes-cards">
        {recipes.map((meal, index) => (
          <ExploreRecipeCard
            key={ meal.strMeal }
            info={ meal }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default IngredientsArea;
