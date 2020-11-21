import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const FALSE = false;
  return (
    <div>
      <Header title="Perfil" search={ FALSE } />
      <Footer />
    </div>
  );
}

export default Profile;
