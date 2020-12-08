import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonsExploreRecipes(props) {
  const { pathname, title } = props;

  const renderButton = (innerText, pagePathName, testId) => (
    <Link to={ pagePathName } data-testid={ testId }>
      {innerText}
    </Link>
  );

  const renderButtons = (pageTitle, pagePathName) => {
    let randomRecipePath;
    let randomId;
    const mockFoodRandomId = 52771;
    const mockDrinkRandomId = 178319;

    const ingredientsPath = `${pagePathName}/ingredientes`;
    const originAreaPath = `${pagePathName}/area`;
    if (pageTitle.match(/comidas/i)) {
      randomId = mockFoodRandomId;
      randomRecipePath = `/comidas/${randomId}`;
    } else {
      randomId = mockDrinkRandomId;
      randomRecipePath = `/bebidas/${randomId}`;
    }

    return (
      <>
        {renderButton('Por Ingredientes', ingredientsPath, 'explore-by-ingredient')}
        {pageTitle === 'Explorar Comidas'
          ? renderButton('Por Local de Origem', originAreaPath, 'explore-by-area')
          : null}
        {renderButton('Me Surpreenda!', randomRecipePath, 'explore-surprise')}
      </>
    );
  };

  return renderButtons(title, pathname);
}
