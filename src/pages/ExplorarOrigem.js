import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreArea from '../components/ExploreArea';

function ExplorarOrigem() {
  const enableSearch = true;
  return (
    <div>
      <Header pageTitle="Explorar Origem" searchAbled={ enableSearch } />
      <ExploreArea />
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
