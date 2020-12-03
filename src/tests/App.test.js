import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import Provider from '../context/Provider';

test('Farewell, front-end', () => {
  const { getByText } = render(<Provider><App /></Provider>);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
