import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

function Perfil() {
  const enableSearch = false;
  return (
    <div>
      <Header pageTitle="Perfil" searchAbled={ enableSearch } />
      <Profile />
      <Footer />
    </div>
  );
}

export default Perfil;
