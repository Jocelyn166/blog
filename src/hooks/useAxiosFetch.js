import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        if (isMounted) {
          const response = await axios.get(url, {
            cancelToken: source.token,
          });
          setData(response.data);
        }
      } catch (err) {
        isMounted && setFetchError(err.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [dataUrl]);

  return { data, isLoading, fetchError };
};

export default useAxiosFetch;
