import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      showSearchBar: false,
      searchInput: '',
    };

    this.handleSearchBarButton = this.handleSearchBarButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSearchBarButton() {
    const { showSearchBar } = this.state;
    if (!showSearchBar) {
      this.setState({
        showSearchBar: true,
      });
    } else {
      this.setState({
        showSearchBar: false,
      });
    }
  }

  render() {
    const { title, noSearchBar } = this.props;
    const { showSearchBar, searchInput } = this.state;
    return (
      <header>
        <div>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
          </Link>
          <h4 data-testid="page-title">{title}</h4>
          { !noSearchBar && (
            <button type="button" onClick={ this.handleSearchBarButton }>
              <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
            </button>
          ) }
        </div>
        {showSearchBar && (
          <div>
            <input
              name="searchInput"
              type="text"
              data-testid="search-input"
              value={ searchInput }
              onChange={ this.handleInput }
            />
            <SearchBar title={ title } searchInput={ searchInput } />
          </div>
        )}
      </header>
    );
  }
}

Header.defaultProps = {
  noSearchBar: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  noSearchBar: PropTypes.bool,
};

export default Header;
