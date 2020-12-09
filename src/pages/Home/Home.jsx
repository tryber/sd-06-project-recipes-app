import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes/Recipes';

const Home = (props) => {
  const { location } = props;
  const { pathname } = location;
  return (
    <div>
      <div className="">
        <Header pathname={ pathname } />
        <Recipes />
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

Home.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string,
};

Home.defaultProps = {
  pathname: 'comidas',
};
