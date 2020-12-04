import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import theIngredientsAndAreaApi from '../services/theIngredientsAndAreaApi';
import { Header, Footer } from '../components';

class ExplorerIngredientsMeals extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
    this.getIngredients = this.getIngredients.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  }

  async getIngredients() {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const { meals } = await theIngredientsAndAreaApi(endPoint);
    this.setState({
      ingredients: meals,
    });
  }

  renderIngredients() {
    const { ingredients } = this.state;
    const zero = 0;
    const twelve = 12;
    const ingsArray = ingredients.slice(zero, twelve);

    return ingsArray.map((item, index) => {
      const { strIngredient } = item;
      const sourceImg = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
      return (
        <div key={ index }>
          <Link
            data-testid={ `${index}-ingredient-card` }
            to={ {
              pathname: '/comidas',
              state: {
                ing: strIngredient,
              },
            } }
          >
            <img
              className="recipe-thumb"
              data-testid={ `${index}-card-img` }
              alt={ strIngredient }
              src={ sourceImg }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
          </Link>
        </div>
      );
    });
  }

  render() {
    const { ingredients } = this.state;
    const zero = 0;
    return (
      <div>
        <Header title="Explorar Ingredientes" noSearchBar />
        { ingredients.length !== zero && this.renderIngredients()}
        <Footer />
      </div>
    );
  }
}

// explorerIngredientsMeals.propTypes = {
//   meal: PropTypes.objectOf.isRequired,
//   idx: PropTypes.number.isRequired,
// };

export default ExplorerIngredientsMeals;
