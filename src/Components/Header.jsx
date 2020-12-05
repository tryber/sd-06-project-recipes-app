import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import profileImage from '../images/profileIcon.svg';

export default function Header() {
  const { titulo } = useContext(Context);

  return (
    <header className="header">
      <div>
        <Link to="/perfil">
          <button
            type="button"
            data-testid="profile-top-btn"
            src="../images/profileIcon.svg"
            alt="profile"
          >
            <img src={ profileImage } alt="profile" />
          </button>
        </Link>
        <h1 data-testid="page-title">{ titulo }</h1>
      </div>
    </header>
  );
}
