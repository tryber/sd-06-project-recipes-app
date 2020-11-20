import React from 'react';
import Header from '../components/Header';

function Explorer() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar" search={ FALSE } />
    </div>
  );
}

export default Explorer;
