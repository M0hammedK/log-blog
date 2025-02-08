import { useEffect, useState } from 'react';
import BlogList from '../../components/BlogList';

const Page = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container my-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="text-center">
          <h1>Loading...</h1>
        </div>
      )}
      {blogs.length > 0 && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Page;
