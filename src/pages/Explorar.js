import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explorar = () => (
  <div className="bg">
    <Header title="Explorar" />
    <div className="row justify-content-center align-items-center m-4">
      <div className="col my-4">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="btn btn-block btn-lg my-2"
          style={ { background: '#7ed957' } }
        >
          <span>Explorar Comidas</span>
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="btn btn-block btn-lg my-2"
          style={ { background: '#7ed957' } }
        >
          <span>Explorar Bebidas</span>
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default Explorar;
