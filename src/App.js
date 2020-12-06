import React from 'react';
import RecipesProvider from './context/RecipesProvider';
import Routers from './routers/index';

export default function App() {
  return (
    <RecipesProvider>
      <Routers />
    </RecipesProvider>
  );
}
