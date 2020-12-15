import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import ReceitasContext from '../context/ReceitasContext';

function PagePerfil() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching, setLogin } = useContext(ReceitasContext);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Perfil');
    setShowSearchBar(false);
    const localStorageEmail = localStorage.getItem('user');
    if (localStorageEmail) {
      const { email } = JSON.parse(localStorageEmail);
      setUserEmail(email);
    }
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="profile-container">
      <Header />
      <section className="profile-body">
        <section className="profile-email">
          {!isFetching && <h3 data-testid="profile-email">{userEmail}</h3>}
        </section>
        <section className="profile-buttons">
          <Link className="profile-link" to="/receitas-favoritas">
            <button
              data-testid="profile-favorite-btn"
              type="button"
              className="profile-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link className="profile-link" to="/receitas-feitas">
            <button
              className="profile-btn"
              data-testid="profile-done-btn"
              type="button"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link className="profile-link" to="/">
            <button
              data-testid="profile-logout-btn"
              type="button"
              className="profile-btn-sair"
              onClick={ () => setLogin(false) }
            >
              Sair
            </button>
          </Link>
        </section>
      </section>
      <Footer />
    </section>
  );
}

export default PagePerfil;
