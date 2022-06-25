import axios from 'axios';
import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentRequest = useCallback(async (url) => {
    setIsLoading(true);
    setError(null);

    try {
      const options = {
        method: 'GET',
        url: url
          ? url
          : 'https://baradox-da-default-rtdb.firebaseio.com/products.json',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.request(options);
      if (res.statusText !== 'OK') {
        throw new Error('Request failed!');
      }
      const response = res.data;
      setIsLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sentRequest,
  };
};

export default useHttp;
