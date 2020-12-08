import React from 'react';
import { Link } from 'react-router-dom';

function ExploreFood() {
  return (
    <div className="explore-food-container">
      <Link
        to="/explorar/comidas"
        className="link-explore"
      >
        <button
          className="btn-explore"
          data-testid="explore-food"
          name="food-btn"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
    </div>
  );
}

export default ExploreFood;
