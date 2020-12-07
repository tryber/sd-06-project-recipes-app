import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Explore.css';

const Explore = (props) => {
  const { setPageTitle } = useContext(Context);
  const { location } = props;
  const { pathname } = location;
  return (
    <div>
      <Header pathname={ pathname } />
      <div className="explore-container">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            onClick={ () => setPageTitle('Explorar Comidas') }
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            onClick={ () => setPageTitle('Explorar Bebidas') }
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      {pathname && pathname !== '/receitas-favoritas'
      && <Footer pathname={ pathname } />}
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
