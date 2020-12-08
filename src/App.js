import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ExploreBebidas from './pages/ExploreBebidas';
import ExploreComidas from './pages/ExploreComidas';
import Menu from './pages/Menu';
import MyProvider from './context/MyProvider';
import MenuDetails from './pages/MenuDetails';
import NotFound from './pages/NotFound';
import Explore from './pages/Explore';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import MealsPerIngredients from './pages/MealsPerIngredients';
import MealsPerArea from './pages/MealsPerArea';
import DrinksPerIngredients from './pages/DrinksPerIngredients';
import InProgress from './pages/InProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/explorar/comidas" component={ ExploreComidas } />
          <Route exact path="/explorar/bebidas" component={ ExploreBebidas } />
          <Route exact path="/comidas" component={ Menu } />
          <Route exact path="/bebidas" component={ Menu } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/comidas/:id" component={ MenuDetails } />
          <Route exact path="/bebidas/:id" component={ MenuDetails } />
          <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
          <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/" component={ Login } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ MealsPerIngredients }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ MealsPerArea }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ DrinksPerIngredients }
          />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
