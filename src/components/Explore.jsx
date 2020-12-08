import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ButtonsContainer  from './style/Explore';

class Explore extends Component {
  render() {
    return (
      <ButtonsContainer>
        <Link data-testid="explore-food" to="/explorar/comidas">
          Explorar Comidas
        </Link>
        <Link data-testid="explore-drinks" to="/explorar/bebidas">
          Explorar Bebidas
        </Link>
      </ButtonsContainer>
    );
  }
}

export default Explore;
