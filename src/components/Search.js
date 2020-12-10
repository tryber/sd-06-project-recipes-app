import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import RevenueContext from '../context/RevenueContext';

export default function SearchBar(props) {
  const { fetchApi, searchParam, setSearchParam } = useContext(RevenueContext);
  const { title } = props;
  const [searchInputValue, setsearchInputValue] = useState();
  const [searchRadioValue, setsearchRadioValue] = useState();
  const [URLToFetch, setURLToFetch] = useState();
  // const [alert, setAlert] = useState();
  // const [time] = useState(5000);

  useEffect(() => {
    if (!URLToFetch && searchParam === 'Meal') fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (!URLToFetch && searchParam === 'Drink') fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (URLToFetch) fetchApi(URLToFetch);
  }, [URLToFetch]);

  const URLs = {
    foodFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputValue}`,
    foodIngredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputValue}`,
    foodName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`,
    drinkFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInputValue}`,
    drinkIngredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputValue}`,
    drinkName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue}`,
  };

  const handleChangeInputValue = ({ target: { value } }) => {
    setsearchInputValue(value);
  };
  const handleRadioValue = ({ target: { value } }) => {
    setsearchRadioValue(value);
  };

  // const showAlert = (content) => {
  //   setAlert(content);
  //   setTimeout(() => {
  //     setAlert(undefined);
  //   }, time);
  // };

  const searchURL = () => {
    if (searchInputValue
      && searchRadioValue === 'first-letter'
      && searchInputValue.length !== 1) {
      // showAlert('Sua busca deve conter somente 1 (um) caracter');
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      if (title === 'Comidas') {
        setSearchParam('Meal');
        if (searchRadioValue === 'first-letter') {
          setURLToFetch(URLs.foodFirstLetter);
        }
        if (searchRadioValue === 'ingredient') {
          setURLToFetch(URLs.foodIngredient);
        }
        if (searchRadioValue === 'name') {
          setURLToFetch(URLs.foodName);
        }
      }
      if (title === 'Bebidas') {
        setSearchParam('Drink');
        if (searchRadioValue === 'first-letter') {
          setURLToFetch(URLs.drinkFirstLetter);
        }
        if (searchRadioValue === 'ingredient') {
          setURLToFetch(URLs.drinkIngredient);
        }
        if (searchRadioValue === 'name') {
          setURLToFetch(URLs.drinkName);
        }
      }
    }
  };

  return (
    <Container className="align-items-center">
      <form data-testid="test-search-bar" className="search-bar">
        <div>
          <label htmlFor="search-input">
            <input
              data-testid="search-input"
              type="text"
              id="search-input"
              name="searh-input"
              placeholder="Buscar Receita"
              onChange={ (e) => handleChangeInputValue(e) }
              className="input-field"
            />
          </label>
        </div>
        <div className="filter-radios">
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              id="ingredient"
              value="ingredient"
              name="radio-selection"
              onChange={ (e) => handleRadioValue(e) }
            />
            <b>Ingrediente</b>
          </label>
          <label htmlFor="name">
            <input
              data-testid="name-search-radio"
              type="radio"
              id="name"
              value="name"
              name="radio-selection"
              onChange={ (e) => handleRadioValue(e) }
            />
            <b>Nome</b>
          </label>
          <label htmlFor="first-letter">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              id="first-letter"
              value="first-letter"
              name="radio-selection"
              onChange={ (e) => handleRadioValue(e) }
            />
            <b>Primeira Letra</b>
          </label>
        </div>
      </form>

      <div>
        <button
          data-testid="exec-search-btn"
          className="bt-login font-app bottom15px"
          type="button"
          onClick={ () => (
            (searchInputValue && searchRadioValue)
              ? searchURL()
              // : showAlert('Preencha campo de busca e selecione ao menos uma opção')
              : alert('Preencha campo de busca e selecione ao menos uma opção')
          ) }
        >
          Buscar
        </button>
      </div>
      {/* {alert && <Row>{alert}</Row>} */}
    </Container>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
