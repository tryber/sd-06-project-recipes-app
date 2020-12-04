import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header, Footer, Explore, ExploreOptions } from '../components';

class Explorar extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        <Header title={ title || 'Explorar' } noSearchBar />
        {!title ? <Explore /> : <ExploreOptions { ...this.props } />}
        <Footer />
      </div>
    );
  }
}

Explorar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Explorar;
