import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Explore extends Component {
  render() {
    return (
      <div>
        <Link data-testid="explore-food" to="/explorar/comidas">
          Explorar Comidas
        </Link>
        <Link data-testid="explore-drinks" to="/explorar/bebidas">
          Explorar Bebidas
        </Link>
      </div>
    );
  }
}

export default Explore;
