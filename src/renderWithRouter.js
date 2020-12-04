import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesAppProvider from './context/RecipesAppProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={ history }>
        <RecipesAppProvider>
          {component}
        </RecipesAppProvider>
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;
