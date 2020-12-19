import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';

function Explorar() {
  const { setSearchHeader } = useContext(RecipesAppContext);
  useEffect(() => setSearchHeader(false), []);
  return (
    <>
      <Header name="Explorar" button={ false } />
      <Footer />
    </>
  );
}

export default Explorar;
