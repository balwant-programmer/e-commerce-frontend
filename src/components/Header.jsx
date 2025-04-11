import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCheckUserAuthQuery } from "../rtkQuery/userAuthservice";
import { useSelector } from "react-redux";
import { useGetcartItemsQuery } from "../rtkQuery/productServices";
import SearchBoxLaptop from "./SearchBoxLaptop";
const Header = () => {
  const { data, isSuccess } = useCheckUserAuthQuery();
  const { TotalQuantity } = useGetcartItemsQuery();
  const [totalcartITem, setTotalCartitem] = useState(TotalQuantity);
  const location = useLocation();
  const cartData = useSelector(
    (state) => state?.api?.queries["getcartItems(undefined)"]?.data?.cartitem
  );
  const error = useSelector(
    (state) => state?.api?.queries["getcartItems(undefined)"]?.error
  );

  useEffect(() => {
    if (cartData && cartData.length >= 1) {
      let totalCart = 0;
      cartData?.forEach(({ quantity }) => {
        totalCart += quantity;
      });
      setTotalCartitem(totalCart);
    }

    if (
      error?.status === 404 &&
      error?.data?.message === "Empty Cart" &&
      error?.data.success === false
    ) {
      setTotalCartitem(TotalQuantity);
    }
    if (
      error?.status === 401 &&
      error?.data?.message === "No token provided, access denied" &&
      error?.data?.success === false
    ) {
      setTotalCartitem(TotalQuantity);
    }
  }, [error, cartData]);

  return (
    <nav
      className="bg-gray-200 font-serif  
      text-sm hidden  md:block fixed w-full z-50  "
    >
      <div className="flex justify-between items-center z-50  md:mx-5">
        <Link to="/" className="text-green-400 hover:scale-105">
          SnapShop
        </Link>
        <SearchBoxLaptop />

        <div className="flex justify-around gap-x-10  text-md text-green-600 font-serif">
          <Link
            to="/"
            className={`px-6 text-gray-700   flex justify-center items-center rounded-3xl  hover:scale-105 ${
              location.pathname === "/" ? "bg-green-400" : "bg-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={`px-6 text-gray-700  flex justify-center items-center rounded-3xl hover:scale-105 ${
              location.pathname === "/contact" ? "bg-green-400" : "bg-slate-50"
            } `}
          >
            Contact
          </Link>
          {isSuccess ? (
            <Link to="/profile">
              <img
                src={data?.user?.image}
                alt="Avatar"
                className="w-8 h-8 active:scale-110 rounded-full outline-1 outline-double    "
              />
            </Link>
          ) : (
            <Link
              to="/register"
              className={` px-6 text-gray-700  flex py-2 sm:py-2  justify-center items-center
               rounded-3xl  hover:scale-105 ${
                 location.pathname === "/register"
                   ? "bg-green-400"
                   : "bg-slate-50"
               }`}
            >
              sign up
            </Link>
          )}
        </div>
        <Link
          to="/cart"
          className={`flex relative  py-2 mt-2 text-blue-400 cursor-pointer ${
            location.pathname === "/cart" ? "text-rose-400" : "text-gray-400"
          }`}
        >
          {totalcartITem ? (
            <p
              className="absolute -top-2 font-serif right-3 
           text-rose-500 bg-black flex items-center justify-center rounded-full h-5 w-5"
            >
              {totalcartITem || TotalQuantity}
            </p>
          ) : (
            <p
              className="absolute -top-2 font-serif right-3 
           text-rose-500 bg-black flex items-center justify-center rounded-full h-5 w-5"
            >
              0
            </p>
          )}

          <ShoppingCartIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
