import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonsExploreRecipes(props) {
  const { pathname, title, className } = props;

  const renderButton = (innerText, pagePathName, testId, backgroundClassName) => (
    <Link to={ pagePathName } data-testid={ testId }>
      <div className="explorar__container-recipeType">
        <div
          className={
            `explorar__element-background ${testId}-${backgroundClassName}`
          }
        />
        <p className="explorar__element-text">
          {innerText}
        </p>
      </div>
    </Link>
  );

  const renderButtons = (pageTitle, pagePathName, classNam) => {
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
        {renderButton('Por Ingredientes',
          ingredientsPath, 'explore-by-ingredient', classNam)}
        {pageTitle === 'Explorar Comidas'
          ? renderButton('Por Local de Origem',
            originAreaPath, 'explore-by-area', classNam)
          : null}
        {renderButton('Me Surpreenda!', randomRecipePath, 'explore-surprise', classNam)}
      </>
    );
  };

  return renderButtons(title, pathname, `${className}`);
}
