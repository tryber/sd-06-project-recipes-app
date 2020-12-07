import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { ingredientsThunk, successIngredients } from '../redux/actions/exploreActions';

function ComidasIngredientes(props) {
  const { ingredients, location: { pathname }, isLoading } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      dispatch(ingredientsThunk('https://www.themealdb.com/api/json/v1/1/list.php?i=list'));
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    if (pathname === '/explorar/bebidas/ingredientes') {
      dispatch(ingredientsThunk('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'));
    }
  }, [dispatch, pathname]);

  if (isLoading) return <div>Carregando</div>;
  return (
    <main>
      <Header pageName="Explorar Ingredientes" renderSearch={ false } />
      <div className="done-recipes-display default-page">
        {
          ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ ingredient }
              ingredientName={ ingredient }
              ingredientImage={ pathname === '/explorar/bebidas/ingredientes'
                ? `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
                : `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
              foodOrDrink={ pathname.includes('comidas') ? '/comidas' : '/bebidas' }
              index={ index }
            />
          ))
        }
      </div>
      <Footer />
    </main>
  );
}

const mapStateToProps = (state) => ({
  ingredients: state.exploreReducer.ingredients,
  isLoading: state.exploreReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(successIngredients()),
});

ComidasIngredientes.propTypes = {
  ingredients: PropTypes.instanceOf(Array),
  location: PropTypes.instanceOf(Object),
  isLoading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ComidasIngredientes);
