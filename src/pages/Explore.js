import React from 'react';
import ExploreButton from '../components/explore/ExploreButton';
import Header from '../components/header';
import Footer from '../components/Footer';
import '../components/explore/Explore.css';

function Explore() {
  return (
    <>
      <main>
        <Header title="Explorar" />
        <nav className="buttons">
          <ExploreButton
            title="Explorar Comidas"
            url="/explorar/comidas"
            testId="explore-food"
          />
          <ExploreButton
            title="Explorar Bebidas"
            url="/explorar/bebidas"
            testId="explore-drinks"
          />
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
