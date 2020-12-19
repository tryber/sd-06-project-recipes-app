import React from 'react';
import Routes from './Routes';
import RecipesAppProvider from './context/RecipesAppProvider';
import './App.css';

function App() {
  return (
    <RecipesAppProvider>
      <Routes />
    </RecipesAppProvider>
  );
}

export default App;
