import { useEffect, useState } from 'react';

function useMealApi(url) {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const resultAPI = await response.json();
        const resultMeal = await resultAPI.meals;
        setData(resultMeal);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
}

export default useMealApi;
