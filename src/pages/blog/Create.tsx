// pages/create.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";

const Create = () => {
  const [blog, setBlog] = useState<{
    title: string;
    author: string;
    body: string;
  }>({
    title: "",
    author: "Mohammed",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      // Reset the form after successful submission
      setBlog({ title: "", author: "Mohammed", body: "" });
      router.push('/')
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark">
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm bg-secondary">
              <div className="card-body">
                <h2 className="card-title mb-4 text-center text-light">
                  Create a New Blog
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label text-light">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Enter blog title"
                      value={blog.title}
                      onChange={(e) =>
                        setBlog({ ...blog, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="author" className="form-label text-light">
                      Author
                    </label>
                    <select
                      className="form-select"
                      id="author"
                      value={blog.author}
                      onChange={(e) =>
                        setBlog({ ...blog, author: e.target.value })
                      }
                      required
                    >
                      <option value="Mohammed">Mohammed</option>
                      <option value="Ali">Ali</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="body" className="form-label text-light">
                      Blog Content
                    </label>
                    <textarea
                      className="form-control"
                      id="body"
                      rows={6}
                      placeholder="Write your blog content here..."
                      value={blog.body}
                      onChange={(e) =>
                        setBlog({ ...blog, body: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    {isLoading ? (
                      <button disabled={true} className="btn btn-danger">
                        Creating...
                      </button>
                    ) : (
                      <button type="submit" className="">
                        Create Blog
                      </button>
                    )}
                    {error && <h4 className="text-danger">{error}</h4>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Create;
