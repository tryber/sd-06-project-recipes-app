import React from 'react';
import { Link } from 'react-router-dom';

function ExploreDrinks() {
  return (
    <div className="explore-drink-container">
      <Link
        to="/explorar/bebidas"
        className="link-explore"
      >
        <button
          className="btn-explore"
          type="button"
          data-testid="explore-drinks"
          name="drinks-btn"
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>

  );
}

export default ExploreDrinks;
