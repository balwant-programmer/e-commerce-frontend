import React, { useEffect, useState } from "react";
import SubcategoruproductList from "./SubcategoruproductList";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";
import { useGetSubcategoryQuery } from "../rtkQuery/categoryServer";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css/bundle";

const SingleCategoryproduct = ({ categoryName }) => {
  const { data } = useSelector((state) => state?.allcategory);
  const filterCategory = data?.filter(
    ({ mainCategoryName }) => mainCategoryName === categoryName
  );
  const [subcategoryname, setsubcategoryname] = useState("");

  const {
    data: subcategoryrpoductData,
    isLoading,
    isError,
    error,
  } = useGetSubcategoryQuery(subcategoryname);
  const HandleSubCategory = (subcategorynameData) => {
    setsubcategoryname(subcategorynameData);
  };

  useEffect(() => {
    setsubcategoryname(filterCategory[0]?.subCategoryName[0]);
  }, [categoryName]);

  if (isError) {
    return (
      <div className="absolute top-2 flex ml-52 w-32">
        <ErrorComponent errorMessage={error.errorMessage} />
      </div>
    );
  }
  return (
    <div>
      <div
        className=" fixed bg-slate-100   z-50 
    font-serif w-full"
      >
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
          className="w-full bg-gray-100 z-50"
        >
          {filterCategory[0]?.subCategoryName &&
            filterCategory[0]?.subCategoryName?.map((item, index) => (
              <SwiperSlide key={Math.random() + 10 + index}>
                <div
                  className={`  py-2   rounded-3xl text-sm z-[1000]
                   flex justify-center transition-all  duration-300 ${
                     subcategoryname === item
                       ? "text-pink-700"
                       : "text-gray-900"
                   } `}
                  onClick={() => HandleSubCategory(item)}
                >
                  <button>{item}</button>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="absolute top-16 pt-16 md:top-24  md:pt-16 pb-24  ">
        {isLoading ? (
          <div className="mt-64 ml-40 md:ml-96 ">
            <Spinner />
          </div>
        ) : (
          <SubcategoruproductList
            subcategoryrpoductData={subcategoryrpoductData}
          />
        )}
      </div>
    </div>
  );
};

export default SingleCategoryproduct;
