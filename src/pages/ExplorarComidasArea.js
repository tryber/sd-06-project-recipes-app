import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { foodAPI, getAreas, getByArea } from '../services/foodAPI';
import MealsCard from '../components/MealsCard';
import ReceitasContext from '../context/ReceitasContext';
import Footer from '../components/Footer';

const ExplorarComidasArea = () => {
  const [areas, setAreas] = useState([]);
  const { meals, setMeals } = useContext(ReceitasContext);
  const doze = 12;

  useEffect(() => {
    const allOption = { strArea: 'All' };
    const minusOne = -1;
    let hasAll = false;
    foodAPI().then((response) => setMeals(response));
    getAreas().then((response) => {
      response.forEach((obj) => {
        if (Object.values(obj).indexOf('All') > minusOne) {
          hasAll = true;
          return hasAll;
        }
      });
      if (!hasAll) {
        response.push(allOption);
      }
      console.log(response);
      return response;
    })
      .then((response) => setAreas(response));
  }, []);

  const handleSelect = () => {
    const dropdown = document.getElementById('area-dropdown');
    const selected = dropdown.options[dropdown.selectedIndex].value;
    if (selected === 'All') {
      foodAPI().then((response) => setMeals(response));
    } else {
      getByArea(selected)
        .then((response) => setMeals(response));
    }
  };

  return (
    <div>
      <Header title="Explorar Origem" searchBtn />
      <label htmlFor="area-dropdown">
        Locais:
        <select
          data-testid="explore-by-area-dropdown"
          id="area-dropdown"
          onChange={ (target) => handleSelect(target) }
        >
          {areas.map((area, i) => (
            <option
              data-testid={ `${area.strArea}-option` }
              key={ i }
              value={ area.strArea }
            >
              {' '}
              {area.strArea}
            </option>))}

        </select>
      </label>
      <main>
        {meals.length && (meals
          .filter((x, index) => index < doze)
          .map((food, i) => (
            <MealsCard key={ i } food={ food } index={ i } />
          )))}
      </main>
      <Footer />
    </div>
  );
};

export default ExplorarComidasArea;
