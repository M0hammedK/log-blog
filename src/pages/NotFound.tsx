import Link from "next/link";

function NotFound() {
    return (
      <div className="container my-5 text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4 text-dark">Page Not Found</h2>
        <p className="text-muted">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn btn-danger mt-4">
          Go Back to Home
        </Link>
      </div>
    );
  }
  
  export default NotFound;