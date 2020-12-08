import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../Css/inProgress.css';

function CheckboxInProgress() {
  const [ingredientsCheckbox, setIngredientsCheckbox] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { id } = useParams();

  const handleChange = (index) => {
    const value = !ingredientsCheckbox[index].checkbox;
    const markedCheckbox = ingredientsCheckbox;
    markedCheckbox[index].checkbox = value;
    setIngredientsCheckbox(markedCheckbox);
  };

  useEffect(() => {
    // setLoading(true);
    const myIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (myIngredients !== null) {
      if (location.pathname.includes('comidas')) {
        setIngredientsCheckbox(myIngredients.meals[id]);
      } else {
        setIngredientsCheckbox(myIngredients.cocktails[id]);
      }
    }
    // setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(false);
    console.log('ingredientsCheckbox', ingredientsCheckbox);
  }, [ingredientsCheckbox]);

  useEffect(() => {
    setLoading(false);
    console.log('loading', loading);
  }, [loading]);

  return (
    (ingredientsCheckbox[0] === undefined || loading)
      ? <h5>Loading...</h5>
      : (
        <div>
          <form className="form-checkbox">
            {ingredientsCheckbox.map((item, index) => (
              <label
                htmlFor="checkbox"
                key={ index }
                data-testid="ingredient-step"
              >
                <input
                  onChange={ () => handleChange(index) }
                  checked={ item.checked }
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                />
                { ` ${item.ingredient} (${item.measure})` }
              </label>
            ))}
          </form>
        </div>
      )
  );
}

export default CheckboxInProgress;
