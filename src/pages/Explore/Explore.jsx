import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Explore = (props) => {
  const { setPageTitle } = useContext(Context);
  const { location } = props;
  const { pathname } = location;
  return (
    <div className="explore-container">
      <Header pathname={ pathname } />
      <div className="explore-buttons">
        <Link to="/explorar/comidas">
          <button
            className="btn btn-explore btn-active"
            type="button"
            data-testid="explore-food"
            onClick={ () => setPageTitle('Explore Meals') }
          >
            Explore Meals
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="btn btn-explore btn-active"
            type="button"
            data-testid="explore-drinks"
            onClick={ () => setPageTitle('Explore Drinks') }
          >
            Explore Drinks
          </button>
        </Link>
      </div>
      <div className="container-footer">
        {pathname && pathname !== '/receitas-favoritas'
        && <Footer pathname={ pathname } />}
      </div>
    </div>
  );
};

export default Explore;

Explore.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string,
};

Explore.defaultProps = {
  pathname: 'explorar',
};
