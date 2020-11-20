import React from 'react';
import Header from '../components/Header';

function Profile() {
  const FALSE = false;
  return (
    <div>
      <Header title="Perfil" search={ FALSE } />
    </div>
  );
}

export default Profile;
