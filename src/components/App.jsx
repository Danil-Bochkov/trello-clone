import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Category } from "./Category/Category";
import { Home } from "./Home/Home";
import { Navigation } from "./Navigation/Navigation";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} end />
        <Route path="/board" element={<Category />} />
      </Routes>
      <ToastContainer />
    </>
  );
};
