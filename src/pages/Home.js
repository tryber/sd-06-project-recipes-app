import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Header from '../components/header';
import Foods from './Foods';
import Drinks from './Drinks';
import Footer from '../components/Footer';
import RecipesAppContext from '../context/RecipesAppContext';
import CategoryList from '../components/CategoryList';
import {
  fetchMealByFirstLetter,
  fetchMealByName,
  fetchMealAPIByIngredient,
  fetchDrinkAPIByFirstLetter,
  fetchDrinkAPIByName,
  fetchDrinkAPIByIngredient,
} from '../services';

function Home({ title }) {
  const [isSearching, setSearch] = useState(false);
  const {
    ingredient,
    setIngredient,
    firstLetter,
    setFirstLetter,
    name,
    setName,
    searchTerm,
    setRecipes,
    setErrorFromApi,
  } = useContext(RecipesAppContext);

  function verification({ target: { id } }) {
    if (id === 'ingredient-search-radio') {
      setIngredient(true);
      setFirstLetter(false);
      setName(false);
    } else if (id === 'first-letter-search-radio') {
      setIngredient(false);
      setFirstLetter(true);
      setName(false);
    } else if (id === 'name-search-radio') {
      setIngredient(false);
      setFirstLetter(false);
      setName(true);
    }
  }

  const requisitionToAPI = async (byIngredient, byFirstLetter, byName) => {
    if (ingredient) {
      const response = await byIngredient(searchTerm);
      if (response === null) {
        setErrorFromApi(true);
      } else {
        setRecipes(response);
        setErrorFromApi(false);
      }
    } else if (firstLetter) {
      if (searchTerm.length !== 1) {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const response = await byFirstLetter(searchTerm);
        if (response === null) {
          setErrorFromApi(true);
        } else {
          setRecipes(response);
          setErrorFromApi(false);
        }
      }
    } else if (name) {
      const response = await byName(searchTerm);
      if (response === null) {
        setErrorFromApi(true);
      } else {
        setRecipes(response);
        setErrorFromApi(false);
      }
    } else {
      window.alert('Escolha uma opção dentre ingredientes, Primeira letra ou Nome');
    }
  };

  const requisition = () => {
    if (title === 'Comidas') {
      requisitionToAPI(fetchMealAPIByIngredient,
        fetchMealByFirstLetter,
        fetchMealByName);
      console.log('Entrou em comidas', title);
    } else {
      requisitionToAPI(fetchDrinkAPIByIngredient,
        fetchDrinkAPIByFirstLetter,
        fetchDrinkAPIByName);
      console.log('Entrou em bebidas', title);
    }
  };

  return (
    <div className="home-container">
      <Header
        title={ title }
        enableSearch
        setSearch={ setSearch }
        isSearching={ isSearching }
      />
      {
        isSearching
        && <SearchBar
          verification={ verification }
          onClick={ requisition }
        />
      }
      <CategoryList title={ title } />
      {title === 'Comidas' ? <Foods title={ title } /> : <Drinks title={ title } />}
      <Footer />
    </div>
  );
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
