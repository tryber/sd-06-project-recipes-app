import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';

function NotFound() {
  const { pathname } = useLocation();

  if (pathname === '/Bebidas') {
    return (
      <Redirect to="/bebidas" />
    );
  }

  return (
    <p>Not Found</p>
  );
}

export default NotFound;
