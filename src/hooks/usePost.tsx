import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function usePost(url: string, data: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    const postData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Redirect to home page after successful post
        router.push("/");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    postData();
  }, [url, data, router]);

  return { isLoading, error };
}

export default usePost;
