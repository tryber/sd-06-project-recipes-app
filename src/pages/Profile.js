import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Profile() {
  const history = useHistory();
  const { setHeader } = useContext(AppContext);
  const [userEmail, setEmail] = useState('');

  useEffect(() => {
    setHeader({ page: 'Perfil', search: false });
    const jsonUser = localStorage.getItem('user');
    if (jsonUser) {
      const { email } = JSON.parse(jsonUser);
      setEmail(email);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <div className="flex-column-container">
        <hr />
        <span data-testid="profile-email">{ userEmail }</span>
        <hr />
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogOut }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
