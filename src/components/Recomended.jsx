import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchDrink, fetchFood } from '../servicesAPI';

function Recomended({ itemType }) {
  const [isFetchingLocal, setIsFetchingLocal] = useState(false);
  const [recomendations, setRecommendations] = useState([]);
  const six = 6;

  useEffect(() => {
    let mounted = true;
    setIsFetchingLocal(true);
    const firstRequestAPI = async () => {
      const response = (itemType === 'comidas')
        ? await fetchFood('itemName', '')
        : await fetchDrink('itemName', '');
      if (mounted) {
        setRecommendations(response);
        setIsFetchingLocal(false);
      }
    };
    firstRequestAPI();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardRecomendation = (recomendation, indexId) => {
    const inversePrefix = { comidas: 'Meal', bebidas: 'Drink' };
    const { [`str${inversePrefix[itemType]}Thumb`]: imagePath,
      [`id${inversePrefix[itemType]}`]: id,
      [`str${inversePrefix[itemType]}`]: itemName } = recomendation;

    return (
      <div
        key={ indexId }
        data-testid={ `${indexId}-recomendation-card` }
        className="recomended-list"
      >
        <div className="recomended-datails">
          <Link className="recomended-details-link" to={ `/${itemType}/${id}` }>
            <div className="recomended-img-body">
              <img
                data-testid={ `${indexId}-card-img` }
                alt="recipe cover"
                className="recomended-image"
                src={ imagePath }
              />
            </div>
            <div
              data-testid={ `${indexId}-recomendation-title` }
              className="recomended-info"
            >
              <h4 className="recomended-title">{itemName}</h4>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div data-slide-to="2" className="recomended-container">
      { isFetchingLocal
        ? <h2>Loading...</h2>
        : (recomendations.map((recomendation, index) => ((index < six)
          ? cardRecomendation(recomendation, index)
          : '')))}
    </div>
  );
}

Recomended.propTypes = {
  itemType: propTypes.string.isRequired,
};

export default Recomended;
