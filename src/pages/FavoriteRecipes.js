import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';

function FavoriteRecipes(props) {
  const { history: { location: { pathname } }, pageConfig } = props;
  const { header } = pageConfig;
  return (
    <Header pathname={ pathname } componentConfig={ header } />
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.receitasFavoritas,
});

export default connect(mapStateToProps, null)(FavoriteRecipes);

FavoriteRecipes.propTypes = {
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
