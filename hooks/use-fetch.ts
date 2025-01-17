import { useState } from "react";
import { toast } from "sonner";

const useFetch = <T>(fetchFunction: (...args: any[]) => Promise<T>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction(...args);
      setData(response);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return { fn, loading, error, data,setData };
};

export default useFetch;
