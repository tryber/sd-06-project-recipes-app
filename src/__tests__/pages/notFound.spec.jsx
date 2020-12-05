import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import NotFound from '../../pages/NotFound';

let screen;

describe('not found testings', () => {
  it('should have the correct test', () => {
    screen = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const notFoundContent = /not found/i;

    const pageTitle = screen.getByText(notFoundContent);
    expect(pageTitle).toBeInTheDocument();
  });
});
