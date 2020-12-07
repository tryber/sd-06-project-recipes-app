import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../App.css';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <div className="explore-btn">
        <button
          data-testid="explore-food"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
          className="btn btn-light btn-lg btn-block btn-exp"
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
          className="btn btn-light btn-lg btn-block btn-exp"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
