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
      <button className="btn btn-warning ml-3 mt-2 mr-2" type="button" data-testid="filter-by-all-btn">All</button>
      <button className="btn btn-warning mt-2 mr-2" type="button" data-testid="filter-by-food-btn">Food</button>
      <button className="btn btn-warning mt-2" type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <div>
        <button
          className="btn btn-warning ml-3 mt-2 mr-2"
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
