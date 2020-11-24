import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class DrinkCard extends React.Component {
  constructor() {
    super();

    this.handleShareDrink = this.handleShareDrink.bind(this);
  }

  handleShareDrink({ idDrink }) {
    const url = `http://localhost:3000/bebidas/${idDrink}`;
    window.alert('Link copiado!');
    //  https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
    const el = document.createElement('textarea');
    el.value = url;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {
    const { history, myRecipesDrink } = this.props;
    return (
      <>
        {myRecipesDrink.map((element, index) => (
          <div key={ index }>
            <input
              type="image"
              data-testid={ `${index}-horizontal-image` }
              src={ element.strDrinkThumb }
              width="200px"
              alt="horizontal"
              onClick={ () => history.push(`/bebidas/${element.idDrink}`) }
            />

            <p data-testid={ `${index}-horizontal-top-text` }>
              {element.strAlcoholic}
            </p>
            <input
              type="button"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => history.push(`/bebidas/${element.idDrink}`) }
              value={ element.strDrink }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>
              {element.dateModified}
            </p>

            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ () => this.handleShareDrink(element) }
            />

          </div>))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  myRecipesDrink: state.menu.doneRecipesDrink,
});

DrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  myRecipesDrink: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(DrinkCard);
