import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavigationMenu from '../components/NavigationMenu';
import AppContext from '../context/AppContext';
import BodyResponseDrink from '../components/BodyResponseDrink';

function Drink() {
  const { setHeader, setOptions } = useContext(AppContext);

  useEffect(() => {
    setHeader({ page: 'Bebidas', search: true });
    return () => setOptions({ text: '', option: '', category: '' });
  }, []);

  return (
    <div>
      <Header />
      <NavigationMenu page="Bebidas" />
      <hr />
      <BodyResponseDrink />
      <Footer />
    </div>
  );
}

export default Drink;
