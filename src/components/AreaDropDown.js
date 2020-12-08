import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changeFoodByArea } from '../redux/actions/searchRecipes';

function AreaDropDown({ areas, dispatchChangeFoodByArea }) {
  const [areaActive, setAreaActive] = useState('');
  const handleChange = (e) => {
    setAreaActive(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    if (areaActive || areaActive === '') dispatchChangeFoodByArea(areaActive);
    console.log('areaActive', areaActive);
  }, [areaActive]);

  const renderAreaDropdown = (arrayAreas, strAreaActive) => {
    console.log(arrayAreas);
    return (
      <select
        value={ strAreaActive }
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => handleChange(e) }
      >
        <option value="" data-testid="All-option">All</option>
        {arrayAreas.map(({ strArea }, index) => (
          <option
            value={ strArea }
            key={ `${strArea}${index}` }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
    );
  };
  return renderAreaDropdown(areas, areaActive);
}

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeFoodByArea: (area) => dispatch(changeFoodByArea(area)),
});

export default connect(null, mapDispatchToProps)(AreaDropDown);
