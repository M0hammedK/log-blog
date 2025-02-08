// pages/blog/[id].tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/` + id)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
        })
        .catch((err) => setError("Failed to fetch blog details"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleDeleteBlog = () => {
    setDeleteError(null);
    setDeleteLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/` + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error: " + res.statusText);
        }
      })
      .catch((err) => {
        setDeleteError(err.message);
      })
      .finally(() => {
        setDeleteLoading(false);
        router.push("/"); // Redirect to home page after deletion
      });
  };

  return (
    <div className="bg-dark">
      <Navbar />
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
        {blog && (
          <div className="card shadow-lg bg-secondary">
            <div className="card-body">
              <h1 className="card-title text-light mb-3">{blog.title}</h1>
              <h5 className="text-light mb-4">Author: {blog.author}</h5>
              <p className="card-text text-light">{blog.body}</p>
            </div>
            {deleteLoading ? (
              <button className="btn btn-danger" disabled>
                Deleting...
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleDeleteBlog}>
                Delete blog
              </button>
            )}
            {deleteError && <h4 className="text-danger">{deleteError}</h4>}
          </div>
        )}
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default BlogDetails;
