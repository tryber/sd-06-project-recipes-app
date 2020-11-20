import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const SearchBar = ({ history }) => {
  const { pathname } = history.location;
  const [ingredients, setIngredients] = useState(false);
  const [name, setName] = useState(false);
  const [firstLetter, setFirstLetter] = useState(false);
  const [text, setText] = useState('');
  const [defaultUrl, setDefaultUrl] = useState('');
  const [API_URL, setApiUrl] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (pathname === '/comidas') {
      setDefaultUrl('https://www.themealdb.com/api/json/v1/1/');
      setType('meals');
    } else {
      setDefaultUrl('https://www.thecocktaildb.com/api/json/v1/1/');
      setType('drinks');
    }
  }, []);

  const everyFalse = () => {
    setFirstLetter(false);
    setName(false);
    setIngredients(false);
  };

  const handleRadio = async ({ target }) => {
    switch (target.id) {
      case 'ingredients':
        everyFalse();
        setIngredients(true);
        setApiUrl(`${defaultUrl}filter.php?i=`);
        break;
      case 'name':
        everyFalse();
        setName(true);
        setApiUrl(`${defaultUrl}search.php?s=`);
        break;
      case 'firstLetter':
        everyFalse();
        setFirstLetter(true);
        setApiUrl(`${defaultUrl}search.php?f=`);
        break;
      default:
        return false;
    }
    return true;
  };

  const handleSearch = ({ target }) => {
    setText(target.value);
  };

  const handleButton = async () => {
    if (text.length > 1 && firstLetter === true) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const url = `${API_URL}${text}`;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    if (data[type] === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (type === 'meals' && data[type].length === 1) {
      history.push(`${pathname}/${data[type][0].idMeal}`);
    } else if (type === 'drink' && data[type].length === 1) {
      history.push(`${pathname}/${data[type][0].idDrink}`);
    }
    return data;
  };

  return (
    <div>
      <button type="button" data-testid="search-top-btn">
        Lupa
      </button>
      <input
        value={text}
        onChange={handleSearch}
        type="text"
        data-testid="search-input"
      />
      <label>
        <input
          id="ingredients"
          checked={ingredients}
          onChange={handleRadio}
          name="kind-of-search"
          type="radio"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label>
        <input
          data-testid="name-search-radio"
          id="name"
          checked={name}
          onChange={handleRadio}
          ame="kind-of-search"
          type="radio"
        />
        Nome
      </label>
      <label>
        <input
          id="firstLetter"
          checked={firstLetter}
          onChange={handleRadio}
          name="kind-of-search"
          type="radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button data-testid="exec-search-btn" onClick={handleButton} type="button">Buscar</button>
    </div>
  );
};

SearchBar.propTypes = {
  history: propTypes.arrayOf(propTypes.object).isRequired,
};

export default SearchBar;
