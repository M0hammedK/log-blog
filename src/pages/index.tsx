// pages/index.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/blog/page";
import Create from "./blog/Create";
import NotFound from "../pages/NotFound";
import { useRouter } from "next/router";
import BlogDetails from "../pages/blog/[id]/blogDetails";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div id="root" className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="main_container flex-grow-1 grey responsive bg-dark">
        <div className="mycontainer">
          {/* Conditional rendering based on route */}
          {router.pathname === "/" && <Home />}
          {router.pathname === "/create" && <Create />}
          {router.pathname === `/blog/${id}/blogDetails` && id && <BlogDetails/>}
          {/* If no match, render NotFound */}
          {!["/", "/create", `/blog/${id}`].includes(router.pathname) && (
            <NotFound />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
