import React, { useEffect, useState } from "react";
import ShareButtons from "./ShareOfthePrduct";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate } from "react-router-dom";
import { useLazyGetAllProductsQuery } from "../rtkQuery/productServices";
import { addMoreProducts } from "../redux/Slice/AllproductDataStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

import {
  useCheckUserAuthQuery,
  useUserwishlistcreateMutation,
} from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";
const AllproductList = () => {
  //trk query.. Hook
  const [trigger, { data }] = useLazyGetAllProductsQuery();
  const { data: userAuth } = useCheckUserAuthQuery();

  const [
    whilistFun,
    {
      data: wishListData,
      isLoading,
      error: wishlistError,
      isError: wishListIsErrror,
    },
  ] = useUserwishlistcreateMutation();
  const priceData = useSelector((state) => state?.categoryFilterReducer?.price);
  const focus = useSelector((state) => state?.searchreducer?.focus);
  const cateoryData = useSelector(
    (state) => state?.categoryFilterReducer?.category
  );
  const isOpen = useSelector((state) => state?.modelReducer?.modelOpen);
  // componenents usestate ...
  let [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hoveredImages, setHoveredImages] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [productIdForShare, setProductIdForShare] = useState(null);
  const {
    priceFilterData,
    categoryFilterData,
    searchFilterData,
    emojiFilterData,
  } = useSelector((state) => state.filterData);

  const fetchData = async () => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(true);
    try {
      const { data } = await trigger({ page, limit: 8 });
      if (data) {
        setProducts((prev) => {
          const newProducts = data?.data?.filter(
            (product) =>
              !prev?.some(
                (existingProduct) => existingProduct._id === product._id
              )
          );
          return [...prev, ...newProducts];
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("Error Fetching All products!", error);
      setLoading(false);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(addMoreProducts(products));
    }
  }, [products]);

  useEffect(() => {
    if (page > 0) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    if (emojiFilterData?.length > 0) {
      setProducts(emojiFilterData);
    }
  }, [emojiFilterData]);

  useEffect(() => {
    if (searchFilterData?.length > 0) {
      setProducts(searchFilterData);
    }
  }, [searchFilterData]);

  useEffect(() => {
    if (categoryFilterData?.length > 0) {
      setProducts(categoryFilterData);
    }
  }, [categoryFilterData]);

  useEffect(() => {
    if (priceFilterData.length > 0) {
      setProducts(priceFilterData);
      console.log(priceFilterData);
    }
  }, [priceFilterData]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 4
    ) {
      if (!isFetching) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  const handleHoverImage = (item, id) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [id]: item,
    }));
  };

  const handleMouseLeave = (id, originalImage) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [id]: originalImage,
    }));
  };

  const handleWishlist = (productId) => {
    whilistFun(productId);
  };

  useEffect(() => {
    if (wishListData && wishListData.success) {
      toast(wishListData?.message);
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

  const HandleShare = (productId) => {
    setProductIdForShare(productId);
  };

  if (focus) return;

  return (
    <div className="mb-10 pt-2  ">
      <div className={`flex flex-wrap p-1 ${isOpen && "fixed"} gap-y-2 mb-10`}>
        {products &&
          products?.map(
            ({
              image,
              subImage,
              _id,
              name,
              description,
              price,
              subcategoryname,
            }) => (
              <div
                className="w-40   rounded-xl bg-gray-300 md:min-w-40 md:w-[108px] mx-2 md:mx-2 overflow-hidden"
                key={Math.random() + _id}
              >
                <div className="relative h-36  md:w-full">
                  <img
                    src={hoveredImages[_id] || image}
                    alt="shop-image"
                    className="absolute inset-0 w-full bg-transparent h-full brightness-100 object-cover object-left-top hover:scale-110 transition-all duration-500"
                    style={{ opacity: hoveredImages[_id] ? 0 : 1 }}
                  />
                  {hoveredImages[_id] && (
                    <img
                      src={hoveredImages[_id]}
                      alt="hovered-shop-image"
                      className="absolute inset-0 hover:scale-110
                       bg-current w-full h-full object-fit transition-all duration-500"
                      style={{ opacity: 1 }}
                    />
                  )}
                </div>
                <Link
                  to={`product/${_id}`}
                  className="w-40  break-words text-sm brightness-105"
                >
                  <p className="text-gray-900">{description?.slice(0, 50)}</p>
                  <p>{subcategoryname}</p>
                  <p className="text-gray-600 font-serif">
                    {name?.slice(0, 30)}
                  </p>
                  <p className="text-rose-900">
                    <CurrencyRupeeIcon fontSize="small" />
                    {price}
                  </p>
                </Link>

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
                )}
                <div className="flex w-1/2 py-2 gap-x-6 mx-2 ">
                  {subImage.map((item, index) => (
                    <img
                      key={`${_id}-subimage-${index}`}
                      src={item}
                      alt={`sub-image-${index}`}
                      className="md:size-6 h-6 w-6  hover:scale-105 rounded-md cursor-pointer"
                      onMouseEnter={() => handleHoverImage(item, _id)}
                      onMouseLeave={() => handleMouseLeave(_id, image)}
                    />
                  ))}
                </div>
                <div className="z-50 flex mx-3 mb-2 justify-end">
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
            )
          )}
      </div>
      {Loading && (
        <div className="flex justify-center items-center  mb-64 mt-10">
          <div className=" size-10 rounded-full border-2 border-t-green-400 animate-spin "></div>
        </div>
      )}
    </div>
  );
};

export default AllproductList;
