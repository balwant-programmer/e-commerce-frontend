import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllProductPriceQuery } from "../rtkQuery/productServices";
import { addpriDataAction } from "../redux/Slice/CategryFilterSlice";
import useWindresize from "../Hook/useWindresize";
import { priceFilterDataAction } from "../redux/FilterDataSlice";
import { data } from "react-router-dom";
import { categoryaction } from "../redux/Slice/CategorySlice";

const priceRanges = [
  { label: "49 - 199", value: [49, 199] },
  { label: "200 - 299", value: [200, 299] },
  { label: "300 - 499", value: [300, 499] },
  { label: "500 - 699", value: [500, 699] },
  { label: "700 - 999", value: [700, 999] },
  { label: "1000 - 2000", value: [1000, 2000] },
];

const PriceFilter = () => {
  const priceData = useSelector((state) => state?.categoryFilterReducer?.price);
  const cateoryData = useSelector(
    (state) => state?.categoryFilterReducer?.category
  );
  const { searchQuery } = useSelector((state) => state?.searchreducer);
  const { emoji: emojiData } = useSelector(
    (state) => state?.categoryFilterReducer
  );
  const { callapi } = useSelector((state) => state?.modelReducer);
  const [trigger, { data: getpricefilterData, isError, error }] =
    useLazyGetAllProductPriceQuery();
  const { width } = useWindresize();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (
        width <= 762 &&
        callapi === true &&
        priceData &&
        priceData.length > 0
      ) {
        const [minPrice, maxPrice] = priceData;
        const emoji = emojiData ? emojiData : "";
        const searchQueryString = searchQuery ? searchQuery : "";
        const selectedCategories = cateoryData;
        setLoading(true);
        const { data } = await trigger({
          selectedCategories,
          minPrice,
          maxPrice,
          searchQueryString,
          emoji,
        });
        if (data.success) {
          setLoading(false);
          dispatch(categoryaction("All"));
        }
      }

      if (width > 762 && priceData.length > 0) {
        const [minPrice, maxPrice] = priceData;
        const emoji = emojiData ? emojiData : "";
        const searchQueryString = searchQuery ? searchQuery : "";
        const selectedCategories = cateoryData ? cateoryData : "";
        setLoading(true);
        const { data } = await trigger({
          selectedCategories,
          minPrice,
          maxPrice,
          searchQueryString,
          emoji,
        });
        if (data.success) {
          setLoading(false);
          dispatch(dispatch(categoryaction("All")));
        }
      }

      if (width > 762 && !(priceData.length > 0)) {
        const selectedCategories = [];
        trigger({ selectedCategories });
      }
    };
    fetchData();
  }, [callapi, priceData, cateoryData, emojiData, searchQuery]);

  const handlePriceRangeClick = (range) => {
    dispatch(addpriDataAction(range.value));
  };

  useEffect(() => {
    if (getpricefilterData && getpricefilterData?.data?.length > 0) {
      dispatch(priceFilterDataAction(getpricefilterData?.data));
    }
  }, [getpricefilterData, dispatch]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="py-3 mx-1">
      <h1 className="text-md font-serif text-center text-green-400 mb-3">
        Price Filter
      </h1>
      <div className="grid grid-cols-2 gap-3 font-serif text-sm  ">
        {priceRanges.map((range, index) => (
          <button
            key={index}
            className={` py-2 px-4 rounded-lg transition duration-200 hover:scale-110 active:scale-110 ${
              priceData[0] === range.value[0] && priceData[1] === range.value[1]
                ? "bg-rose-700 text-white"
                : "bg-white text-rose-500"
            }`}
            onClick={() => handlePriceRangeClick(range)}
          >
            {range.label}
          </button>
        ))}
      </div>
      {loading && (
        <div className="size-8 border-b-2 absolute top-52 md:-right-96 left-40 border-b-red-600 flex justify-center items-center animate-spin rounded-full mx-auto">
          <div className="size-6  border-b-2 border-b-red-600 animate-spin rounded-full mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
