import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <Link to="/explorar">
        <button className="categ-buttons" type="button">
          Explorar
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
