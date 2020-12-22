import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
// import PropTypes from 'prop-types';

class Footer extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <footer className="global-footer" data-testid="footer">
        <input
          src={ drinkIcon }
          type="image"
          alt="bla"
          data-testid="drinks-bottom-btn"
          onClick={ () => history.push('/bebidas') }
        />
        <input
          src={ exploreIcon }
          type="image"
          alt="bla"
          data-testid="explore-bottom-btn"
          onClick={ () => history.push('/explorar') }
        />
        <input
          src={ mealIcon }
          type="image"
          alt="bla"
          data-testid="food-bottom-btn"
          onClick={ () => history.push('/comidas') }
        />
      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Footer);
