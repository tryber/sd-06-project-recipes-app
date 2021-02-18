import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

function Explore(props) {
  const { history: { location: { pathname } }, pageConfig } = props;
  const { header } = pageConfig;
  return (
    <div className="explorar_container-page">
      <Header pathname={ pathname } componentConfig={ header } />
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"

      >
        <div className="explorar__container-recipeType">

          <div className="explorar__element-background foodbackground" />
          <p className="explorar__element-text">
            Explorar Comidas
          </p>
        </div>
      </Link>
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        <div className="explorar__container-recipeType">

          <div className="explorar__element-background drinkbackground" />
          <p className="explorar__element-text">
            Explorar Bebidas
          </p>
        </div>
      </Link>
      <Footer />
    </div>

  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorar,
});

export default connect(mapStateToProps, null)(Explore);

Explore.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
  }).isRequired,

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
