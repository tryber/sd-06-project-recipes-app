import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../Components/Header';
import Lupa from '../Components/Lupa';
import Footer from '../Components/Footer';
import FoodCard from '../Components/FoodCard';
import * as api from '../services/Api';

export default function ExplorarComidasLocalOrigem({ history }) {
  const {
    titulo,
    setTitulo,
    loading,
    setLoading,
    mealsByArea,
    setMealsByArea } = useContext(Context);
  const [areas, setAreas] = useState([]);
  const [value, setValue] = useState('all');

  const fetchAreas = async () => {
    setLoading(true);
    const response = await api.fetchMealsByArea();
    setAreas(response);
    console.log(response);
    setLoading(false);
  };

  const fetchFoods = async () => {
    setLoading(true);
    const imeals = await api.fetchFoodByName('');
    setMealsByArea(imeals);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Explorar Origem');
    fetchAreas();
    fetchFoods();
  }, []);

  const onChange = async ({ target }) => {
    setLoading(true);
    setValue(target.value);
    const response = await api.fetchFoodByArea(target.value);
    setMealsByArea(response);
    setLoading(false);
  };

  const onClick = (id) => {
    history.push(`/comidas/${id}`);
  };

  const twelve = 12;

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa />
      {loading ? <p>Loading</p>
        : (
          <div>
            <select
              data-testid="explore-by-area-dropdown"
              id="explore-by-area-dropdown"
              onChange={ onChange }
              value={ value }
            >
              <option data-testid="All-option" key="all" value="all">All</option>
              {areas.map((area, index) => (
                <option
                  key={ index }
                  value={ area.strArea }
                  data-testid={ `${area.strArea}-option` }
                >
                  {area.strArea}
                </option>))}
            </select>
            {mealsByArea.filter((meal, index) => meal && index < twelve)
              .map((meal, index) => (
                <button
                  key={ meal.idMeal }
                  type="button"
                  onClick={ () => onClick(meal.idMeal) }
                >
                  <FoodCard food={ meal } index={ index } />
                </button>))}
          </div>
        )}
      <Footer />
    </div>
  );
}

ExplorarComidasLocalOrigem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
