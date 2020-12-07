import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newSelectedArea } from '../redux/actions/areaAction';

const Dropdown = ({ areas, isLoading, selectedArea, currentArea }) => {
  if (isLoading) return <div>Carregando</div>;

  return (
    <div className="sub-header">
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target: { value } }) => selectedArea(value) }
      >
        {
          areas.map((area) => (
            <option
              key={ area }
              data-testid={ `${area}-option` }
              value={ area }
              selected={ area === currentArea }
            >
              { area }
            </option>
          ))
        }
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedArea: PropTypes.string.isRequired,
  currentArea: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  areas: state.areaReducer.areas,
  isLoading: state.areaReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  selectedArea: (value) => dispatch(newSelectedArea(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
