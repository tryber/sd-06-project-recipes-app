import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Routers from './routers/index';

export default function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Routers />
      </RecipesProvider>
    </BrowserRouter>
  );
}
