import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Context from '../context/Context';
import Footer from '../Components/Footer';

export default function Explorar() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}
