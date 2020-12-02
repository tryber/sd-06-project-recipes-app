import React from 'react';
import { Router } from 'react-router-dom';
import Provider from '../hooks/Provider';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(
    <Provider>
      <Router history={ history }>{ component }</Router>
    </Provider>
    ), history,
  });
}

export default renderWithRouter;
