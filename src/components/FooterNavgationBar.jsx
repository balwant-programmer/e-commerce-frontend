import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HelpIcon from "@mui/icons-material/Help";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCheckUserAuthQuery } from "../rtkQuery/userAuthservice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useGetcartItemsQuery } from "../rtkQuery/productServices";
import {
  callApiAction,
  modelOpenAction,
} from "../redux/Slice/FilterModeloepneFixedAllproductSlice";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CateoryFilter";
import EmojiFilter from "./EmojiFilter";
import {
  rescateory,
  reseteemojiaction,
  resprice,
} from "../redux/Slice/CategryFilterSlice";

const FooterNavgationBar = () => {
  const { data, isSuccess } = useCheckUserAuthQuery();
  const { totalQuantity } = useGetcartItemsQuery();
  const loaction = useLocation();
  const dispatch = useDispatch();
  const [totalCartitem, setTotalCartitem] = useState(totalQuantity);
  const cartData = useSelector(
    (state) => state?.api?.queries["getcartItems(undefined)"]?.data?.cartitem
  );
  const error = useSelector(
    (state) => state?.api?.queries["getcartItems(undefined)"]?.error
  );
  const isOpen = useSelector((state) => state?.modelReducer?.modelOpen);
  const location = useLocation();
  useEffect(() => {
    if (cartData && cartData.length >= 1) {
      let totalCart = 0;
      cartData?.forEach(({ quantity }) => {
        totalCart += quantity;
      });
      setTotalCartitem(totalCart || totalQuantity);
    }

    if (
      error?.status === 404 &&
      error?.data?.message === "Empty Cart" &&
      error?.data.success === false
    ) {
      setTotalCartitem(totalQuantity);
    }

    if (
      error?.status === 401 &&
      error?.data?.message === "No token provided, access denied" &&
      error?.data?.success === false
    ) {
      setTotalCartitem(totalQuantity);
    }
  }, [error, cartData]);

  const HandleOpenModal = () => {
    dispatch(modelOpenAction(true));
    dispatch(resprice(""));
    dispatch(reseteemojiaction(""));
    dispatch(rescateory());
    dispatch(callApiAction(false));
  };
  const closeModal = () => dispatch(modelOpenAction(false));
  const HandleSubmitFilter = () => {
    dispatch(modelOpenAction(false));
    dispatch(callApiAction(true));
  };

  return (
    <>
      <div
        className="bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 
       border-2 select-none border-t-gray-200 fixed bottom-0 z-50 w-full p-1  md:hidden lg:hidden xl:hidden"
      >
        <div className="flex justify-between font-serif text-sm text-gray-900 mx-2">
          <Link
            to="/"
            className={` p-2 rounded-3xl flex flex-col justify-center items-center focus:scale-105 ${
              location.pathname === "/" ? "bg-gray-200" : ""
            }`}
          >
            <HomeIcon />
            <p className={`${location.pathname === "/" ? "text-[9px]" : null}`}>
              Home
            </p>
          </Link>

          <Link
            to="/contact"
            className={`px-2 rounded-3xl flex flex-col justify-center items-center focus:scale-105 ${
              location.pathname === "/contact" ? "bg-gray-200" : ""
            }`}
          >
            <HelpIcon />
            <p>Contact</p>
          </Link>
          <Link
            to="/cart"
            className={`px-2 rounded-3xl flex flex-col justify-center  items-center  ${
              location.pathname === "/cart" ? "bg-gray-200" : ""
            }`}
          >
            <div
              className="flex flex-col relative    h-16 items-center justify-center
             w-16  rounded-full"
            >
              {totalCartitem ? (
                <p
                  className="flex justify-center items-center 
                rounded-full text-white  absolute -top-0 bg-rose-600  left-1  h-5 w-5 "
                >
                  {totalCartitem || totalQuantity}
                </p>
              ) : (
                <p
                  className="flex justify-center items-center 
                rounded-full text-white  absolute -top-0 bg-rose-600  left-1  h-5 w-5 "
                >
                  0{" "}
                </p>
              )}
              <ShoppingCartIcon fontSize="small" />
              <p>cart</p>
            </div>
          </Link>

          <Link
            onClick={HandleOpenModal}
            className={`px-2 rounded-3xl flex flex-col justify-center items-center focus:scale-105 ${
              location.pathname === "/filter" ? "bg-gray-200" : ""
            }`}
          >
            <FilterAltIcon />
            <p>Filter</p>
          </Link>
          {isSuccess ? (
            <Link
              to="/profile"
              className={`flex flex-col justify-center items-center focus:scale-105 `}
            >
              <img
                src={data?.user?.image}
                alt="Avatar"
                className="w-7 h-7 rounded-full outline-1 outline-double outline-pink-900"
              />
              <p>You</p>
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className={`p-2 rounded-3xl flex flex-col justify-center items-center focus:scale-105 ${
                  loaction.pathname === "/register" ? "bg-gray-200" : ""
                }`}
              >
                <AccountCircleIcon />
                <p>You</p>
              </Link>
            </>
          )}
        </div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Profile Modal"
          className="modal color overflow-hidden over bg-gray-900 text-gray-400 border-none outline-none rounded-none h-screen w-screen  fixed inset-0
           p-4   font-serif"
          overlayClassName="overlay fixed  inset-0  z-[1000] 
           bg-opacity-50 flex justify-center items-center"
        >
          <div>
            <div className="flex items-start justify-between mx-2">
              <p
                onClick={closeModal}
                className="mb-4 bg-gray-700 size-8 active:scale-110  text-white flex justify-center items-center rounded-full"
              >
                <CloseIcon />
              </p>
              <h2>Filter</h2>
            </div>
            <div>
              <PriceFilter />
            </div>
            <div>
              <CategoryFilter />
            </div>

            <div className="mt-4">
              <EmojiFilter />
            </div>
            <div className="mt-2">
              <button
                className="bg-rose-700 w-full  active:scale-110 transition-all duration-200 rounded-xl py-2 "
                onClick={HandleSubmitFilter}
              >
                Filter
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default FooterNavgationBar;
