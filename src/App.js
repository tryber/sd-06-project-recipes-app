import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Rotas from './pages/Rotas';

function App() {
  return (
    <Provider>
      <Rotas />
    </Provider>
  );
}

export default App;
