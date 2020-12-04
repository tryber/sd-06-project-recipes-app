import { useState, useEffect } from 'react';
import fetchRecipes from '../services/index';

const useRequestFood = () => {
  const [filter, setFilter] = useState({ text: '', option: '', category: '' });
  const [apiResponse, setApiResponse] = useState([]);
  const requestAPI = async () => {
    let URL = '';
    if (filter.option === 'Ingrediente') {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter.text}`;
    }
    if (filter.option === 'Primeira letra') {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter.text}`;
    }
    if (filter.option === 'Nome' || filter.option === '') {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter.text}`;
    }
    if (filter.category !== '') {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter.category}`;
    }

    const response = await fetchRecipes(URL);
    if (response.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      setApiResponse(response.meals);
    }
  };

  useEffect(() => {
    requestAPI();
  }, [filter]);

  return [apiResponse, setFilter];
};

export default useRequestFood;
