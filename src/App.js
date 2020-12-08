import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import RecipeDetails from './pages/RecipeDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="width360">
      <Switch>
        <Route exact path="/" component={ () => <Login title="Login" /> } />
        <Route exact path="/comidas" component={ () => <MainPage title="Comidas" /> } />
        <Route exact path="/bebidas" component={ () => <MainPage title="Bebidas" /> } />
        <Route path="/comidas/:recipeId" component={ RecipeDetails } />
        <Route path="/bebidas/:recipeId" component={ RecipeDetails } />
        <Route path="/comidas/:recipeId/in-progress" component={ RecipeDetails } />
        <Route path="/bebidas/:recipeId/in-progress" component={ RecipeDetails } />
        <Route
          exact
          path="/explorar"
          component={ () => <MainPage title="Explorar" /> }
        />
        <Route
          exact
          path="/explorar/comidas"
          component={ () => <MainPage title="Explorar Comidas" /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ () => <MainPage title="Explorar Bebidas" /> }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ () => <MainPage title="Explorar Ingredientes" /> }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ () => <MainPage title="Explorar Ingredientes" /> }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ () => <MainPage title="Explorar Origem" /> }
        />
        <Route
          exact
          path="/perfil"
          component={ () => <MainPage title="Perfil" /> }
        />
        <Route
          exact
          path="/receitas-feitas"
          component={ () => <MainPage title="Receitas Feitas" /> }
        />
        <Route
          exact
          path="/receitas-favoritas"
          component={ () => <MainPage title="Receitas Favoritas" /> }
        />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}
export default App;
