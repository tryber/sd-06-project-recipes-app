import { useState, useEffect } from 'react';

export default function useAPI(category, type = 'name', text = '') {
  const [filters, setFilters] = useState({
    searchText: text,
    searchType: type,
    category,
  });
  const [items, setItems] = useState();

  const initSearch = async () => {
    const { searchText, searchType } = filters;
    if (category === '') {
      return undefined;
    }
    const typeOfFetch = (category === 'comidas')
      ? 'meals'
      : 'drinks';

    try {
      const api = (category === 'comidas')
        ? 'https://www.themealdb.com/api/json/v1/1/'
        : 'https://www.thecocktaildb.com/api/json/v1/1/';

      let endpoint = '';

      switch (searchType) {
      case 'ingredient':
        endpoint = `filter.php?i=${searchText}`;
        break;
      case 'name':
        endpoint = `search.php?s=${searchText}`;
        break;
      case 'first-letter':
        endpoint = `search.php?f=${searchText}`;
        break;
      case 'category':
        endpoint = `filter.php?c=${searchText}`;
        break;
      case 'ingredientsList':
        endpoint = 'list.php?i=list';
        break;
      default:
        break;
      }

      const dataJson = await fetch(`${api + endpoint}`);

      const data = await dataJson.json();

      const firstCard = 0;
      const maxCards = 12;

      const slicedResults = (data[typeOfFetch] <= maxCards)
        ? data[typeOfFetch]
        : data[typeOfFetch].slice(firstCard, maxCards);

      setItems({ [typeOfFetch]: slicedResults });
    } catch (error) {
      setItems({ [typeOfFetch]: null });
      alert('alert da fetch: ', error.message);
    }
  };

  useEffect(() => {
    const newFilters = {
      searchText: text,
      searchType: type,
      category,
    };
    setFilters(newFilters);
    initSearch();
  }, [category, type, text]);

  return items;
}
