import { fetchMainPage } from './fetchMainPage';

export function fetchAreas() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json());
}

export function fetchFoodByArea(area) {
  if (area === 'All') return fetchMainPage('/comidas');

  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((data) => data.json());
}
