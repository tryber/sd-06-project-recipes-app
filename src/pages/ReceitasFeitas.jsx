import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Context from '../context/Context';
import Header from '../Components/Header';
import ShareIcon from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const { titulo, setTitulo } = useContext(Context);
  const [sharedURL, setSharedURL] = useState(false);

  useEffect(() => {
    setTitulo('Receitas Feitas');
  }, []);

  const urlToClipboard = () => {
    const url = window.location.href;

    copy(url);
    setSharedURL(true);
  };

  return (
    <div>
      <Header titulo={ titulo } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <div>
        <button
          type="button"
          alt="compartilhar"
          data-testid="share-btn"
          onClick={ urlToClipboard }
        >
          <img src={ ShareIcon } alt="compartilhar" />
        </button>
        {sharedURL ? <p>Link copiado!</p> : null}
      </div>
    </div>
  );
}
