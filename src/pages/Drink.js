import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavigationMenu from '../components/NavigationMenu';
import AppContext from '../context/AppContext';
import useRequestDrink from '../hooks/useRequestDrink';

function Drink() {
  const { setHeader, options, setOptions } = useContext(AppContext);
  const [apiResponse, setFilter] = useRequestDrink([]);

  const maxShow = 12;
  useEffect(() => {
    setHeader({ page: 'Bebidas', search: true });
    return () => setOptions({ text: '', option: '', category: '' });
  }, []);

  useEffect(() => {
    setFilter(options);
  }, [options]);

  return (
    <div>
      <Header />
      <NavigationMenu page="Bebidas" />
      <hr />
      <div className="bodier">
        { apiResponse.length === 1 && options.category === ''
          ? <Redirect to={ `/bebidas/${apiResponse[0].idDrink}` } />
          : apiResponse.filter((e, index) => e && index < maxShow).map((drink, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
            >
              <Link to={ `/bebidas/${drink.idDrink}` }>
                <h4
                  className="text"
                  data-testid={ `${index}-card-name` }
                >
                  {drink.strDrink}
                </h4>
                <img
                  className="picture"
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
              </Link>
            </div>))}
      </div>
      <Footer />
    </div>
  );
}

export default Drink;
