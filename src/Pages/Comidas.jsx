import React from 'react';
import SearchBar from '../Components/SearchBar';

function Comidas({ history }) {
  return (
    <div>
      <SearchBar history={history} />
      <h1>COmidas</h1>
    </div>
  );
}
export default Comidas;
