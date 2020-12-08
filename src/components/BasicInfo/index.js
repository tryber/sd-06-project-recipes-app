import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';
import { FavoriteFoodButton } from '../FavoriteBtn';
import ShareButton from '../ShareBtn';

const BasicInfo = () => {
  const { detailsInfo } = useContext(ContextAPI);
  const path = window.location.href;
  const isFoodPage = path.includes('comidas');

  return (
    <div>
      <div className="container-photo">
        <img
          data-testid="recipe-photo"
          className="img-initial"
          src={ isFoodPage
            ? detailsInfo.foods.strMealThumb : detailsInfo.drinks.strDrinkThumb }
          alt={ isFoodPage ? detailsInfo.foods.strMeal : detailsInfo.drinks.strDrink }
        />
      </div>
      <div className="container-title">
        <span
          className="title"
          data-testid="recipe-title"
        >
          { isFoodPage ? detailsInfo.foods.strMeal : detailsInfo.drinks.strDrink }
        </span>
        <div className="container-icons">
          <ShareButton />
          <FavoriteFoodButton />
        </div>
      </div>
      <div
        className="container-cotegory"
        data-testid="recipe-category"
      >
        {isFoodPage ? detailsInfo.foods.strCategory : detailsInfo.drinks.strCategory }
        {!isFoodPage && detailsInfo.drinks.strAlcoholic }
      </div>
    </div>
  );
};

export default BasicInfo;
