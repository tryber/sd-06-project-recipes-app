import React from 'react';
import Header from '../components/Header';

function Cocktails() {
  const TRUE = true;
  return (
    <div>
      <Header title="Bebidas" search={ TRUE } />
    </div>
  );
}

export default Cocktails;
