import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Explore.css';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="body-explore">
        <div>
          <Link to="/explorar/comidas">
            <button type="button" data-testid="explore-food">Explorar Comidas</button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/bebidas">
            <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
