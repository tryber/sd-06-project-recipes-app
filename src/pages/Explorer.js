import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorer() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar" search={ FALSE } />
      <Footer />
    </div>
  );
}

export default Explorer;
