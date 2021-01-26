import { useCallback, useState } from 'react';
import useAuth from './auth.hook';

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const request = useCallback(async ({
    url,
    method = 'GET',
    body = null,
    headers = {},
    isAuthentication = false,
  }) => {
    setLoading(true);
    try {
      const stringifyedBody = JSON.stringify(body);
      const newHeader = headers;
      const token = await getToken();

      newHeader['Content-Type'] = 'application/json';
      if (!isAuthentication) {
        newHeader.Authorization = `Bearer ${token}`;
      }

      const totalData = { method, headers: newHeader };

      if (body) {
        totalData.body = stringifyedBody;
      }

      const response = await fetch(url, totalData);
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get data.');
      }

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [getToken]);

  const clearErorr = useCallback(() => setError(null), []);

  return {
    loading,
    request,
    error,
    clearErorr,
  };
};

export default useHttp;
