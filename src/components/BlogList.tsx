// components/BlogList.tsx
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  author: string;
  body: string;
}

interface BlogListProps {
  blogs: Blog[];
  title: string;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, title }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-light">{title}</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-6">
            <div className="card blog-card my-3">
              <Link key={blog.id}
            href={`/blog/${blog.id}/blogDetails`} passHref legacyBehavior>
                <div className="card-body bg-secondary">
                  <h5 className="card-title text-light">
                    Author: {blog.author}
                  </h5>
                  <h6 className="text-dark">{blog.title}</h6>
                  <p className="text-muted">{blog.body.slice(0, 100)}...</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
