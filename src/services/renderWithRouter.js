import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../store';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider store={ store }>
        <Router
          history={ history }
        >
          { component }
        </Router>
      </Provider>,
    ),
    history,
  };
};

export default renderWithRouter;
