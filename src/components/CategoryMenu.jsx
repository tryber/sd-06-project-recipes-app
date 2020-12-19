import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { newCategorySelectedThunk } from '../redux/actions/mainPageFetcher';
import { categoriesThunk, newCategorySelected } from '../redux/actions/categoryActions';

const CategoryMenu = ({ pathname, categories, isLoading, onClick, currentCategory }) => {
  const dispatch = useDispatch();

  useEffect(
    () => { dispatch(categoriesThunk(pathname)); }, [pathname, dispatch],
  );
  if (isLoading) return <div>Carregando</div>;
  return (
    <div>
      {
        categories.map((category) => (
          <button
            type="button"
            value={ category }
            key={ category }
            onClick={ ({ target: { value } }) => {
              if (currentCategory === value) return onClick('All', pathname);
              return onClick(value, pathname);
            } }
            data-testid={ `${category}-category-filter` }
          >
            { category }
          </button>
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  isLoading: state.categoryReducer.loading,
  currentCategory: state.categoryReducer.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (category, pathname) => {
    dispatch(newCategorySelectedThunk(category, pathname));
    dispatch(newCategorySelected(category));
  },
});

CategoryMenu.propTypes = {
  pathname: PropTypes.string.isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
