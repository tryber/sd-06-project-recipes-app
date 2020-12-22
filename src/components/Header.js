import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchInput from './SearchInput';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      h1: '',
      searchInput: false,
    };
    this.ajustingStatesWithH1 = this.ajustingStatesWithH1.bind(this);
  }

  componentDidMount() {
    this.ajustingStatesWithH1();
  }

  ajustingStatesWithH1() {
    const { history: { location: { pathname } } } = this.props;
    if (pathname === '/bebidas') {
      this.setState({
        h1: 'Bebidas',
      });
    }
    if (pathname === '/comidas') {
      this.setState({
        h1: 'Comidas',
      });
    }
    if (pathname === '/explorar') {
      this.setState({
        h1: 'Explorar',
      });
    }
    if (pathname === '/explorar/comidas') {
      this.setState({
        h1: 'Explorar Comidas',
      });
    }
    if (pathname === '/explorar/bebidas') {
      this.setState({
        h1: 'Explorar Bebidas',
      });
    }
    if (pathname === '/explorar/comidas/ingredientes') {
      this.setState({
        h1: 'Explorar Ingredientes',
      });
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      this.setState({
        h1: 'Explorar Ingredientes',
      });
    }
    if (pathname === '/explorar/comidas/area') {
      this.setState({
        h1: 'Explorar Origem',
      });
    }
    if (pathname === '/explorar/bebidas/area') {
      this.setState({
        h1: 'Explorar Origem',
      });
    }
    if (pathname === '/perfil') {
      this.setState({
        h1: 'Perfil',
      });
    }
    if (pathname === '/receitas-feitas') {
      this.setState({
        h1: 'Receitas Feitas',
      });
    }
    if (pathname === '/receitas-favoritas') {
      this.setState({
        h1: 'Receitas Favoritas',
      });
    }
  }

  render() {
    const { h1, searchInput } = this.state;
    const { history: { location: { pathname } }, history } = this.props;
    return (
      <header className="header-global-header">
        <div className="global-header">
          <div className="profile-icon-div">
            <input
              src={ profileIcon }
              type="image"
              alt="bla"
              data-testid="profile-top-btn"
              className="profile-icon"
              onClick={ () => history.push('/perfil') }
            />
          </div>
          <h1 id="header-h1" data-testid="page-title" className="global-h1">
            {h1}
          </h1>
          <div className="search-input-div">
            {(pathname !== ('/explorar')
              && pathname !== ('/explorar/comidas')
              && pathname !== ('/explorar/bebidas')
              && pathname !== ('/explorar/comidas/ingredientes')
              && pathname !== ('/explorar/bebidas/ingredientes')
              && pathname !== ('/perfil')
              && pathname !== ('/receitas-feitas')
              && pathname !== ('/receitas-favoritas'))
              && <input
                src={ searchIcon }
                id="search-icon"
                type="image"
                alt="search-image"
                data-testid="search-top-btn"
                onClick={ () => this.setState({ searchInput: !searchInput }) }
              />}
          </div>
        </div>
        { searchInput && <SearchInput history={ history } /> }
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Header;
