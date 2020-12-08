import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const { email } = JSON.parse(user);
      setUserEmail(email);
    }
  }, []);

  const onclick = () => {
    localStorage.clear();
  };

  return (
    <div className="profile-container">

      <h3 data-testid="profile-email">{ userEmail }</h3>

      <div className="profile-btn-container">

        <Link
          to="/receitas-feitas"
          className="profile-btn"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Link>

        <Link
          to="/receitas-favoritas"
          className="profile-btn"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Link>

        <Link
          to="/"
          className="profile-btn"
          onClick={ () => onclick() }
          data-testid="profile-logout-btn"
        >
          Sair
        </Link>

      </div>

    </div>
  );
}

export default Profile;
