import apiDataProcessor from '../services/apiDataProcessor';

export default function resizeFetchReturn(data, maxLength) {
  const processing = data.meals || data.drinks;
  let list = [];
  const increment = 1;
  const initialIndex = 0;
  const lengthLimit = processing.length > maxLength
    ? maxLength
    : processing.length;
  for (let i = initialIndex; i < lengthLimit; i += increment) {
    list.push(processing[i]);
  }
  list = list.map((recipe) => (apiDataProcessor(recipe)));

  return list;
}
