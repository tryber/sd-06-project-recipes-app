import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import profileImage from '../images/profileIcon.svg';

export default function Header() {
  const { titulo } = useContext(Context);

  return (
    <header className="d-flex w-100 bg-warning mb-2">
      <div>
        <Link to="/perfil">
          <button
            type="button"
            data-testid="profile-top-btn"
            src="../images/profileIcon.svg"
            alt="profile"
            className="btn-warning mr-5 mt-2"
          >
            <img src={ profileImage } alt="profile" />
          </button>
        </Link>
      </div>
      <h1 className=" title" data-testid="page-title">{ titulo }</h1>
    </header>
  );
}
