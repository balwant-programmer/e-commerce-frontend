import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../redux/Slice/CategryFilterSlice";
import { useLazyGetAllProductFilterQuery } from "../rtkQuery/productServices";
import useWindresize from "../Hook/useWindresize";
import { modelOpenAction } from "../redux/Slice/FilterModeloepneFixedAllproductSlice";
import { categoryFilterDataAction } from "../redux/FilterDataSlice";
import { categoryaction } from "../redux/Slice/CategorySlice";
const CategoryFilter = () => {
  const emoji = useSelector((state) => state?.categoryFilterReducer?.emoji);
  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state) => state.categoryFilterReducer.category
  );
  const priceData = useSelector((state) => state?.categoryFilterReducer?.price);
  const { searchQuery } = useSelector((state) => state?.searchreducer);

  const { callapi } = useSelector((state) => state?.modelReducer);

  const { emoji: emojiData } = useSelector(
    (state) => state?.categoryFilterReducer
  );

  const { width } = useWindresize();
  const [trigger, { data: filterproductData }] =
    useLazyGetAllProductFilterQuery();
  useEffect(() => {
    const fetchcData = async () => {
      if (emoji || searchQuery) return;
      const page = 1;
      const limit = 10;
      const [minPrice, maxPrice] = priceData;
      if (selectedCategories?.length > 0) {
        if (width <= 762 && callapi) {
          const { data } = await trigger({
            selectedCategories,
            page,
            limit,
            minPrice,
            maxPrice,
          });
          if (data?.success) {
            dispatch(modelOpenAction(false));
            dispatch(categoryaction("All"));
          }
        }

        if (width > 762 && !callapi) {
          const { data } = await trigger({
            selectedCategories,
            page,
            limit,
            minPrice,
            maxPrice,
          });
          if (data?.success) {
            dispatch(categoryaction("All"));
          }
        }
      } else if (width > 762) {
        setTimeout(() => {
          trigger({ selectedCategories: [], page, limit });
        }, 2);
      }
    };

    fetchcData();
  }, [callapi, selectedCategories, width, priceData]);

  useEffect(() => {
    if (filterproductData?.data?.length > 0) {
      dispatch(categoryFilterDataAction(filterproductData?.data));
    }
  }, [filterproductData, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(addCategory(category));
  };
  if (searchQuery) return;
  if (emojiData) return;
  return (
    <div className="p-1 text-black">
      <h1 className="text-md font-serif text-green-500 text-center mb-2">
        Category Filter
      </h1>
      <div className="grid grid-cols-2 gap-4 font-thin text-sm">
        {["phone", "laptop", "watches", "sadi", "shoes", "earpods"].map(
          (category) => (
            <button
              key={category}
              className={`bg-white py-2 px-4 rounded-lg transition duration-200 hover:scale-110 active:scale-110 ${
                selectedCategories.includes(category)
                  ? "bg-rose-900 text-green-400"
                  : "text-rose-700"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="font-bold">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
