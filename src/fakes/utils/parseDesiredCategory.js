export default function parseCategory(type, { area, category, alcoholicOrNot }) {
  switch (type) {
    case 'comida':
      return `${area} - ${category}`;
    case 'bebida':
      return `${alcoholicOrNot}`;
    default:
      return null;
  }
}
