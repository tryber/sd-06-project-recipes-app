import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { header: { page, search }, setOptions, options } = useContext(AppContext);
  const [searchBar, setSearchBar] = useState(false);
  const [inputs, setInputs] = useState({ text: '', option: '' });
  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };
  const handleFilter = () => {
    setOptions({ ...options, ...inputs });
  };
  const alertFunction = () => {
    alert('Sua busca deve conter somente 1 (um) caracter');
  };

  return (
    <div>
      <header className="header">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" alt="profile" src={ profileIcon } />
        </Link>
        <div data-testid="page-title">{page}</div>
        { search
          ? (
            <button
              className="search-button"
              type="button"
              onClick={ () => setSearchBar(!searchBar) }
            >
              <img data-testid="search-top-btn" alt="profile" src={ searchIcon } />
            </button>) : <div />}
      </header>
      { searchBar
        ? (
          <div className="search-bar">
            <input
              type="text"
              id="text"
              data-testid="search-input"
              value={ inputs.text }
              onChange={ handleChange }
            />
            <div>
              <input
                type="radio"
                id="option"
                name="type-search"
                data-testid="ingredient-search-radio"
                value="Ingrediente"
                onClick={ handleChange }
              />
              Ingrediente
              <input
                type="radio"
                id="option"
                name="type-search"
                data-testid="name-search-radio"
                value="Nome"
                onClick={ handleChange }
              />
              Nome
              <input
                type="radio"
                id="option"
                name="type-search"
                data-testid="first-letter-search-radio"
                value="Primeira letra"
                onClick={ handleChange }
              />
              Primeira letra
            </div>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ inputs.text.length > 1 && inputs.option === 'Primeira letra'
                ? alertFunction
                : handleFilter }
            >
              Buscar
            </button>
          </div>
        ) : ''}
    </div>
  );
}

export default Header;
