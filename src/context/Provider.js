import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

// Refatorar o context
function Provider({ children }) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState({
    searchText: '',
    searchType: '',
  });
  const [pageTitle, setPageTitle] = useState('');
  const [searchBar, setSearchBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [details, setdetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [doneFavRecipeFilter, setDoneFavRecipeFilter] = useState('all');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [cardType, setCardType] = useState('');
  const [ingredientFilter, setIngredientFilter] = useState('');
  const [page, setPage] = useState('');
  const [mealsAreasList, setMealsAreasList] = useState([]);
  const [inProgressId, setInProgressId] = useState({
    id: '',
    type: '',
  });
  const [navCategory, setNavCategory] = useState('All');
  const [navFooter, setNavFooter] = useState('meal');

  const context = {
    email,
    setemail,
    password,
    setPassword,
    searchBar,
    setSearchBar,
    search,
    setSearch,
    recipes,
    setRecipes,
    loading,
    setLoading,
    pageTitle,
    setPageTitle,
    setdetails,
    details,
    recomendations,
    setRecomendations,
    ingredients,
    setIngredients,
    selectedCategory,
    setSelectedCategory,
    doneFavRecipeFilter,
    setDoneFavRecipeFilter,
    cardType,
    setCardType,
    doneRecipes,
    setDoneRecipes,
    favRecipes,
    setFavRecipes,
    page,
    setPage,
    ingredientFilter,
    setIngredientFilter,
    mealsAreasList,
    setMealsAreasList,
    inProgressId,
    setInProgressId,
    navCategory,
    setNavCategory,
    navFooter,
    setNavFooter,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
