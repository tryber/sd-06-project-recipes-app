import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function FilterButtons({ show, type, shouldRenderButtons }) {
  const { categories, recipesToRender, recipesToRenderByCategory } = useContext(Context);
  const [currentFilter, setCurrentFilter] = useState();

  const handleClick = ({ target }) => {
    if (target.value === currentFilter) {
      setCurrentFilter('');
      recipesToRender(type);
    } else {
      setCurrentFilter(target.value);
      recipesToRenderByCategory(type, target.value);
    }
  };

  if (show && shouldRenderButtons) {
    return (
      categories.map(({ strCategory }, index) => {
        if (!index) {
          return (
            <>
              <button
                key="All"
                data-testid="All-category-filter"
                type="button"
                value=""
                onClick={ () => recipesToRender(type) }
              >
                All
              </button>
              <button
                key={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                type="button"
                value={ strCategory }
                onClick={ (e) => handleClick(e) }
              >
                {strCategory}
              </button>
            </>
          );
        }

        return (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            value={ strCategory }
            onClick={ (e) => handleClick(e) }
          >
            {strCategory}
          </button>
        );
      })
    );
  }
  return null;
}

FilterButtons.propTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string,
  shouldRenderButtons: PropTypes.bool.isRequired,
};

FilterButtons.defaultProps = {
  type: '',
};

export default FilterButtons;
