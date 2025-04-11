import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShareButtons from "./ShareOfthePrduct";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate } from "react-router-dom";
import PopofRatingAndREviewFields from "./PopofRatingAndREviewFields";
import {
  useAddToCartMutation,
  useGetcartItemsQuery,
  useGetReviewAndRatingAllQuery,
} from "../rtkQuery/productServices";
import { addToCart } from "../redux/Slice/addToCartSlice";
import ErrorComponent from "./ErrorComponent";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";

const SingleProductLeftSideData = ({ product, singleproductData }) => {
  const [showproductDetials, setShowproductDetails] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = product?._id || singleproductData?.product?._id;
  const { data, isError, isLoading } = useGetReviewAndRatingAllQuery(id);
  const { totalReviewAndRating } = data || {};
  const { refetch } = useGetcartItemsQuery();
  const [
    trigger,
    {
      data: datatocartData,
      error: addTocartError,
      isLoading: addtocartLaoding,
      isError: adddtocartisError,
    },
  ] = useAddToCartMutation();

  useEffect(() => {
    if (adddtocartisError && addTocartError) {
      if (
        addTocartError?.data?.message === "No token provided, access denied" &&
        addTocartError?.data?.success === false
      ) {
        setTimeout(() => {
          navigate("/login");
        }, 20);
      }
    }
  }, [adddtocartisError, addTocartError, datatocartData]);

  const HandleAddToCart = async (id, price) => {
    dispatch(addToCart({ productId: id }));
    const productId = id;
    await trigger({ productId, quantity: 1, price });
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorComponent />;
  }
  return (
    <>
      <div>
        <div className="font-medium select-none">
          <p className="mt-3 text-sm text-gray-600  p-4">
            <p className="text-xl font-bold  ">
              {" "}
              {product?.name || singleproductData?.product?.name}
            </p>{" "}
            {product?.description || singleproductData?.product?.description}
          </p>
          <p className="text-xl text-yellow-400 font-semibold  py-2 px-2">
            <CurrencyRupeeIcon />
            {product?.price || singleproductData?.product?.price}
            <div className="flex items-center gap-3 mt-4 mb-6  py-4 px-2">
              <div className="flex items-center text-yellow-400">
                <span className="text-xl">⭐</span>
                <p className="font-semibold text-lg">4.0</p>
              </div>
              <div className="text-gray-600 flex gap-2">
                <p className="text-sm">{totalReviewAndRating} ratings</p>
                <p className="text-sm">{totalReviewAndRating} reviews</p>
              </div>
            </div>
          </p>
          <div className="flex gap-4 flex-wrap mb-6 justify-start items-center  p-4">
            <div className="text-gray-400 font-sans text-end mx-2  flex justify-end cursor-pointer">
              <PopofRatingAndREviewFields
                product={product}
                singleproductData={singleproductData}
              />
            </div>
            <div className=" flex items-center gap-x-16  py-2 px-10">
              <p className=" font-semibold ">Product Details</p>
              <p
                className="text-2xl text-rose-600 cursor-pointer hover:text-rose-500 transition-all duration-300"
                onClick={() => setShowproductDetails((prev) => !prev)}
              >
                ⌞ ⌝
              </p>
            </div>
            <div
              className={`font-medium text-sm p-4 ${
                showproductDetials ? "hidden" : "block"
              }`}
            >
              <p>{product?.name || singleproductData?.product?.name}</p>
              <p>
                Price: ₹{product?.price || singleproductData?.product?.price}
              </p>
              <p>Cash on delivery only</p>
              <p>Available in multiple colors</p>

              <div className="flex items-center gap-3 mt-3 mb-4">
                <div className="flex items-center text-yellow-400">
                  <span className="text-xl">⭐</span>
                  <p className="font-semibold text-lg">4.0</p>
                </div>
                <div className="text-gray-600 flex gap-2">
                  <p className="text-sm">{totalReviewAndRating} ratings</p>
                  <p className="text-sm">{totalReviewAndRating} reviews </p>
                </div>
              </div>
            </div>
            <div className="text-green-400 flex justify-between w-full items-center    mt-4 active:scale-110">
              <Link
                to={`/review/${
                  product?._id || singleproductData?.product?._id
                }`}
                className="px-4 hover:text-rose-500 py-2 rounded-tr-xl  bg-black text-sm
           border-pink-400 font-serif"
              >
                Rate product
              </Link>
              <div>
                <ShareButtons
                  productIdForShare={
                    product?._id || singleproductData?.product?._id
                  }
                  description={
                    product?.description ||
                    singleproductData?.product?.description
                  }
                />
              </div>
            </div>
            <div
              className="w-full flex justify-center mt-6 items-center "
              onClick={() =>
                HandleAddToCart(
                  product?._id || singleproductData?.product?._id,
                  product?.price || singleproductData?.product?.price
                )
              }
            >
              <button
                className="px-3 bg-gradient-to-tr font-serif active:scale-105
               to-green-600 text-white via-rose-900 rounded-ss-xl
             from-blue-400 w-full py-2"
              >
                {addtocartLaoding ? (
                  <div className="py-1 flex items-center  justify-center">
                    adding..
                    <div className="size-4 animate-spin border-2 rounded-full border-green-100 border-t-rose-300   "></div>
                  </div>
                ) : (
                  "add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductLeftSideData;
