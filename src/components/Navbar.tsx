// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-secondry bg-secondary py-3">
      <div className="container">
        <Link href="/" passHref>
          <h1 className="text-light">Log-Blog</h1>
        </Link> 
        <div className="d-flex">
          <Link href="/" passHref>
            <button className="nav-link me-2 text-light">Home</button>
          </Link>
          <Link href="/blog/Create" passHref>
            <button className="nav-link text-light">New Blog</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
