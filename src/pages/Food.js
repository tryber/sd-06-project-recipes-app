import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import NavigationMenu from '../components/NavigationMenu';
import BodyResponseFood from '../components/BodyResponseFood';

function Food() {
  const { setHeader, setOptions } = useContext(AppContext);

  useEffect(() => {
    setHeader({ page: 'Comidas', search: true });
    return () => setOptions({ text: '', option: '', category: '' });
  }, []);

  return (
    <div>
      <Header />
      <NavigationMenu page="Comidas" />
      <hr />
      <BodyResponseFood />
      <Footer />
    </div>
  );
}

export default Food;
