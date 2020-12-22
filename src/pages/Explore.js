import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Explore extends React.Component {
  componentDidMount() {
    this.changeH1Width();
  }

  changeH1Width() {
    const h1 = document.querySelector('.global-h1');
    const profileDiv = document.querySelector('.profile-icon-div');
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      h1.style.fontSize = '36px';
      profileDiv.style.width = '90px';
      const searchInputDiv = document.querySelector('.search-input-div');
      searchInputDiv.style.width = '70px';
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div className="explore-buttons">
        <Header history={ history } />
        <div className="explore-buttons-div">
          <button
            type="button"
            className="explore-button"
            data-testid="explore-food"
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </button>
          <button
            type="button"
            className="explore-button"
            onClick={ () => history.push('/explorar/bebidas') }
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Explore);
