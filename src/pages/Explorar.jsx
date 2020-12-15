import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import { Header, Footer } from '../components';

function Explorar({ requestAPI }) {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar');
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="explorar-container">
      <Header
        requestAPI={ requestAPI }
      />
      <section className="explorar-body">
        <Link
          className="explorar-comidas-link"
          data-testid="explore-food"
          to="/explorar/comidas"
        >
          Explorar Comidas
        </Link>
        <Link
          className="explorar-bebidas-link"
          data-testid="explore-drinks"
          to="/explorar/bebidas"
        >
          Explorar Bebidas
        </Link>
      </section>
      <Footer />
    </section>
  );
}

Explorar.defaultProps = {
  requestAPI: () => null,
};

Explorar.propTypes = {
  requestAPI: propTypes.func,
};

export default Explorar;
