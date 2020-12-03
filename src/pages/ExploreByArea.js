import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestMealByArea } from '../services/requestsAPI';

function ExploreByArea() {
  // const [ingredientes, setIngredients] = useState([]);
  const mealsAreas = [
    'American', 'British', 'Canadian', 'Chinese', 'Dutch', 'Egyptian', 'French',
    'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese', 'Kenyan',
    'Malaysian', 'Mexican', 'Moroccan', 'Russian', 'Spanish', 'Thai', 'Tunisian',
    'Turkish', 'Unknown', 'Vietnamese',
  ];

  // function handleChangeArea(e) {
  //   const area = e.target.value;
  //   console.log(e.target.value);
  // }

  useEffect(() => {
    async function fetchData() {
      const areaResults = await requestMealByArea();
      console.log(areaResults);
      // setIngredients(areaResults);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleChangeArea(e) }
          // key={ meal }
        >
          <option
            key="all"
            value="all"
          >
            All
          </option>
          { mealsAreas.map((meal) => (
            <option
              data-testid={ `${meal}-option` }
              key={ meal }
              value={ meal }
            >
              { meal }
            </option>
          ))}
        </select>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
