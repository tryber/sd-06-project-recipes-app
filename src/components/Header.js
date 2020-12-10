import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import RevenueContext from '../context/RevenueContext';
import SearchBar from './Search';
import CategoryButton from './CategoryButton';

export default function Header(props) {
  const { title } = props;
  const { search, setSearch, searchButton } = useContext(RevenueContext);
  const searchButtonHidden = () => (
    <a
      href
      data-testid="test-search-top-btn"
      type="button"
      onClick={ () => {
        setSearch(!search);
      } }
      className="button-standard"
    >
      <img src={ SearchIcon } alt="Profile" data-testid="search-top-btn" />
    </a>
  );
  return (
    <header data-testid="test-header">
      <Container>
        <div className="header-component">
          <div className="bt-icon">
            <Link to="/perfil" data-testid="test-profile-top-btn">
              <img src={ ProfileIcon } alt="Profile" data-testid="profile-top-btn" />
            </Link>
          </div>
          <h1
            className="center font-app title-header"
            data-testid="page-title"
          >
            {title}
          </h1>
          <div className="bt-icon">
            <span>{!searchButton && searchButtonHidden()}</span>
          </div>
        </div>
        {search && <SearchBar title={ title } />}
        {!search && <CategoryButton />}
      </Container>
      <div className="color-line" />
    </header>

  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
