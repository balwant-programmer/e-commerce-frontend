import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { categoryaction } from "../redux/Slice/CategorySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css/bundle";
import {
  rescateory,
  reseteemojiaction,
  resprice,
} from "../redux/Slice/CategryFilterSlice";
import SearchBoxFortheMobile from "./searchBoxFortheMobile";
const CategoryList = ({ data }) => {
  const { categoryName } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    setSelectedCategory(categoryName);
  }, [categoryName]);
  const dispatch = useDispatch();
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(categoryaction(category));
    dispatch(rescateory(category));
    dispatch(reseteemojiaction(null));
    dispatch(resprice(""));
  };

  useEffect(() => {
    dispatch(categoryaction(selectedCategory));
  }, [selectedCategory]);

  return (
    <>
      <div
        className="flex  
          cursor-pointer  fixed top-0 md:top-12 w-full z-50 border-b-2
       border-gray-00  bg-gray-100  pt-12 pb-3 
       md:pt-3 md:pb-3 font-serif   px-2  gap-x-1"
      >
        <div className="fixed  flex  gap-x-5 w-2/2 items-center  top-1 italic   md:hidden">
          <p className="text-pink-700  font-serif text-md brightness-200    rounded-full">
            Snap<span className="text-rose-600">S</span>hop
          </p>
          <SearchBoxFortheMobile />
        </div>

        <Swiper
          modules={[Keyboard]}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          keyboard={{ enabled: true }}
          className="w-full z-[1000] "
        >
          {data?.map(({ mainCategoryName, _id }) => (
            <SwiperSlide key={_id}>
              <div
                onClick={() => handleCategoryClick(mainCategoryName)}
                className={`${
                  selectedCategory === mainCategoryName
                    ? "bg-gray-300"
                    : "bg-slate-100"
                } rounded-3xl p-1 cursor-pointer text-center`}
              >
                <p className="text-gray-900 font-serif text-md">
                  {mainCategoryName}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CategoryList;
