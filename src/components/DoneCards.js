// import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import shareIcon from '../images/shareIcon.svg';

// function DoneCards(props) {
//   const {
//     type,
//     area,
//     category,
//     alcoholicOrNot,
//     name,
//     image,
//     doneDate,
//     tags,
//     index,
//   } = props.recipe;

//   console.log(props);
//   return (
//     <div key={ index }>
//       <img
//         src={ image }
//         alt="element img"
//         data-testid={ `${index}-horizontal-image` }
//       />
//       <p data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</p>
//       <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
//       <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
//       {
//         tags
//       && tags.map(
//         (tag, idx) => (
//           <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ idx }>{ tag }</p>
//         ),
//       )
//       }
//       <button
//         data-testid={ `${index}-horizontal-share-btn` }
//         type="button"
//         src={ shareIcon }
//       >
//         <img src={ shareIcon } alt="Share Icon" />
//       </button>
//     </div>
//   );
// }

// DoneCards.propTypes = {
//   element: PropTypes.objectOf.isRequired,
//   idx: PropTypes.number.isRequired,
//   strDrink: PropTypes.string.isRequired,
//   strDrinkThumb: PropTypes.string.isRequired,
// };

// export default DoneCards;
