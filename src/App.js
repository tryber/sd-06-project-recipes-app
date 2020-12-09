import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/appRouter';
import Provider from './context/Provider';
// import history from './helpers/History';
import './css/App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
