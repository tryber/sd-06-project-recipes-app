import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PageNotFound() {
  const FALSE = false;

  return (
    <div>
      <Header title="Not Found" search={ FALSE } />
      <h1>Error 404</h1>
      <Footer />
    </div>
  );
}

export default PageNotFound;
