import React, { useContext, useEffect, useState } from 'react';
import CardsFood from '../components/CardsFood';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodFilterArea,
  requestApiFoodFilterName,
  requestApiFoodListArea,
} from '../services/requestFood';

function ComidasPorOrigem() {
  const {
    cards: {
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const [optionsArea, setOptionsArea] = useState([]);

  useEffect(() => {
    requestApiFoodListArea()
      .then((apiListArea) => {
        const listArea = apiListArea.map((objArea) => objArea.strArea);
        const listAreaOptions = ['All', ...listArea];
        setOptionsArea(listAreaOptions);
      });
  }, []);

  const onChangeDropdown = async ({ target: { value } }) => {
    if (value === 'All') {
      requestApiFoodFilterName()
        .then((arrayApi) => setCardFood(arrayApi));
    } else {
      const arrayFilterArea = await requestApiFoodFilterArea(value);
      setCardFood(arrayFilterArea);
    }
  };

  return (
    <>
      <Header name="Comida por Origem" button={ false } />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ onChangeDropdown }
      >
        {optionsArea.map((area) => (
          <option
            key={ area }
            data-testid={ `${area}-option` }
          >
            { area }
          </option>
        ))}
      </select>
      <CardsFood />
      <Footer />
    </>
  );
}

export default ComidasPorOrigem;
