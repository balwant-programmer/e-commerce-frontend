import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShareButtons from "./ShareOfthePrduct";
import { Link, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

import {
  useCheckUserAuthQuery,
  useUserwishlistcreateMutation,
} from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";

const SubcategoruproductList = ({ subcategoryrpoductData }) => {
  const [productIdForShare, setProductIdForShare] = useState(null);
  const [hoveredImages, setHoveredImages] = useState({});
  const navigate = useNavigate();
  const [
    whilistFun,
    {
      data: wishListData,
      isLoading,
      error: wishlistError,
      isError: wishListIsErrror,
    },
  ] = useUserwishlistcreateMutation();

  useEffect(() => {
    if (wishListData && wishListData.success) {
      toast.success(wishListData?.message);
    }
  }, [wishListData]);

  useEffect(() => {
    if (wishListIsErrror) {
      if (
        wishlistError?.status === 401 &&
        wishlistError?.data?.success === false &&
        wishlistError?.data?.message === "No token provided, access denied"
      ) {
        navigate("/login");
      }
    }
  }, [wishlistError]);

  const { data: userAuth } = useCheckUserAuthQuery();

  const HandleHoverImage = (item, id) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [id]: item,
    }));
  };
  const HandleMouseLeave = (id, originalImage) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [id]: originalImage,
    }));
  };

  const handleWishlist = (productId) => {
    whilistFun(productId);
  };

  const HandleShare = (productId) => {
    setProductIdForShare(productId);
  };

  return (
    <>
      <div className="flex flex-wrap gap-y-2 ">
        {subcategoryrpoductData &&
          subcategoryrpoductData?.map(
            ({ image, subImage, _id, name, description, price }) => (
              <div
                className="bg-gray-200 w-40 rounded-xl md:min-w-40 md:w-[108px] mx-2 md:mx-2 overflow-hidden"
                key={_id}
              >
                <div className="relative h-40 md:w-full">
                  <img
                    src={hoveredImages[_id] || image}
                    alt="shop-image"
                    className="absolute inset-0 w-full bg-transparent h-full object-fit hover:scale-110 transition-all duration-500"
                    style={{ opacity: hoveredImages[_id] ? 0 : 1 }}
                  />
                  {hoveredImages[_id] && (
                    <img
                      src={hoveredImages[_id]}
                      alt="hovered-shop-image"
                      className="absolute inset-0 w-full hover:scale-110 bg-current h-full object-fit transition-all duration-500"
                      style={{ opacity: 1 }}
                    />
                  )}
                </div>

                <Link
                  to={`/product/${_id}`}
                  className="w-32 px-1 break-words text-sm"
                >
                  <p className="text-gray-400">{description?.slice(0, 30)}</p>
                  <p className="text-gray-400 font-serif  ">
                    {name?.slice(0, 15)}
                  </p>
                  <p className="text-gray-900">
                    <CurrencyRupeeIcon
                      fontSize="small"
                      className="text-rose-400"
                    />
                    {price}
                  </p>
                </Link>
                <div>
                  <span
                    onClick={() => HandleShare(_id)}
                    className="mt-2 rounded-sm cursor-pointer bg-gray-200 p-2 inline-block"
                  >
                    <ShareIcon />
                  </span>
                  {productIdForShare === _id && (
                    <ShareButtons
                      productIdForShare={productIdForShare}
                      description={description}
                    />
                  )}{" "}
                </div>
                <div className="flex w-1/2 py-2 gap-x-3 mx-2">
                  {subImage.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt={`sub-image-${index}`}
                      className="md:size-6 size-7 hover:scale-105 rounded-3xl cursor-pointer"
                      onMouseEnter={() => HandleHoverImage(item, _id)}
                      onMouseLeave={() => HandleMouseLeave(_id, image)}
                    />
                  ))}
                  <div className=" flex mx-3 mb-2 justify-end z-0">
                    <button onClick={() => handleWishlist(_id)}>
                      <BookmarkBorderIcon
                        className={`${
                          userAuth?.user?.wishlist?.includes(_id.toString()) &&
                          "text-red-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default SubcategoruproductList;
