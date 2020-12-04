import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppProvider from '../provider/AppProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <AppProvider>
          { component }
        </AppProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
