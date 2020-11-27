import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ingredientsThunk, resetId } from '../redux/actions/exploreActions';

const Explorer = (props) => {
  const { location: { pathname }, handleClick, id, handleResetId } = props;

  if (id !== '') {
    handleResetId();

    return (
      <Redirect
        to={ `${pathname.includes('comidas')
          ? '/comidas'
          : '/bebidas'}/${id}` }
      />
    );
  }

  return (
    <main className="default-page">
      <Link to={ `${pathname}/ingredientes` }>
        <button
          type="button"
          value={ pathname === '/explorar/bebidas'
            ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
            : 'https://www.themealdb.com/api/json/v1/1/list.php?i=list' }
          onClick={ ({ target: { value } }) => handleClick(value) }
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      {
        pathname === '/explorar/comidas'
        && (
          <Link to={ `${pathname}/area` }>
            <button
              type="button"
              value="https://www.themealdb.com/api/json/v1/1/list.php?a=list"
              onClick={ ({ target: { value } }) => handleClick(value) }
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        )
      }
      <button
        type="button"
        value={ pathname === '/explorar/comidas'
          ? 'https://www.themealdb.com/api/json/v1/1/random.php'
          : 'https://www.thecocktaildb.com/api/json/v1/1/random.php' }
        onClick={ ({ target: { value } }) => handleClick(value) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </main>
  );
};

Explorer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  handleResetId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ id: state.exploreReducer.id });

const mapDispatchToProps = (dispatch) => ({
  handleClick: (value) => dispatch(ingredientsThunk(value)),
  handleResetId: () => dispatch(resetId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
