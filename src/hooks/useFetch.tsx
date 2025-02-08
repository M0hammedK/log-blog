import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Couldn't fetch data from resource!");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted!");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
