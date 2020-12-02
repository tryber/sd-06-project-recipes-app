import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const [doneRecipes, setdoneRecipes] = useState('');

  useEffect(() => {
    const myDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setdoneRecipes(myDoneRecipes);
  }, []);

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        {doneRecipes && doneRecipes
          .map(({ image, name, area, category, doneDate, tags }, index) => (
            <span
              key={ index }
            >
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${area} - ${category}` }
              </p>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { doneDate }
              </p>
              <img
                src={ shareIcon }
                alt="Compatilhar Receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              {tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
            </span>
          ))}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
