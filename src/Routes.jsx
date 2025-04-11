import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SingleproductList from "./pages/SingleproductList";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn ";
import RatingAndReview from "./components/RatingAndReview ";
import AddToCart from "./components/AddToCart";
import Contact from "./pages/Contact";
import Orderproduct from "./pages/Orderproduct";
import NotFoundPage from "./pages/NotFoundPage";
import ForgetPassword from "./components/ForgetPassword";
import Wishlist from "./pages/wishlist";

const routes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <RedirectIfLoggedIn element={<Register />} />,
        },
        {
          path: "login",
          element: <RedirectIfLoggedIn element={<Login />} />,
        },
        {
          path: "product/:id",
          element: <SingleproductList />,
        },
        {
          path: "profile",
          element: <ProtectedRoute element={<UserProfile />} />,
        },
        {
          path: "review/:id",
          element: <RatingAndReview />,
        },
        {
          path: "/cart",
          element: <AddToCart />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/order",
          element: <Orderproduct />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "login/forgot-password",
          element: <ForgetPassword />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
      ],
    },
  ]);
};

export default routes;
