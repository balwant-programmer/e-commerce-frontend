import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleProductLeftSideData from "../components/SinlheProductLeftSide";
import { useSingleproductQuery } from "../rtkQuery/productServices";
import Spinner from "../components/Spinner";
import ErrorComponent from "../components/ErrorComponent";
import {
  rescateory,
  reseteemojiaction,
  resprice,
} from "../redux/Slice/CategryFilterSlice";
import RelatedProduct from "../components/RelatedProduct";
const SingleproductList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);
  const dispatch = useDispatch();
  let data = useSelector((state) => state?.allproductData?.products);
  const {
    data: singleproductData,
    isLoading: singleproductIsloading,
    isSuccess,
    isError,
  } = useSingleproductQuery(id);
  const [SingleData] = product?.filter(({ _id }) => _id === id) || [];

  useEffect(() => {
    setproduct(data);
  }, []);

  const settings = {
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 500,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
  };

  if (singleproductIsloading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  const handleBack = () => {
    dispatch(rescateory(""));
    dispatch(reseteemojiaction(null));
    dispatch(resprice(""));
    navigate(-1);
  };

  return (
    <>
      <div className="grid     lg:grid-cols-2 md:grid-cols-1 md:gap-x-32   md:py-4 ">
        <div className="w-80 md:w-96  ml-3 ">
          <div className="my-2" onClick={handleBack}>
            <button className="text-gray-500 font-serif bg-gray-100 px-3  rounded-t-xl">
              <span className="text-rose-400 text-lg"> ⤶</span> back
            </button>
          </div>
          <Slider {...settings}>
            <div>
              <img
                src={singleproductData?.product?.image || SingleData?.image}
                alt="Image 1"
                className="w-full  h-80 object-cover object-left-top rounded-md overflow-hidden"
              />
            </div>
            {isSuccess
              ? singleproductData?.product?.subImage?.map((item) => (
                  <div>
                    <img
                      src={item}
                      alt="Image 1"
                      className="w-full h-80 object-left-top object-cover rounded-md overflow-hidden"
                    />
                  </div>
                ))
              : SingleData?.subImage?.map((item) => (
                  <div>
                    <img
                      src={item}
                      alt="Image 1"
                      className="w-full h-80 object-left-top object-cover rounded-md overflow-hidden"
                    />
                  </div>
                ))}
          </Slider>
        </div>

        <div className=" my-4  mx-2">
          <SingleProductLeftSideData
            product={product}
            singleproductData={singleproductData}
          />
        </div>
      </div>
      <RelatedProduct />
    </>
  );
};

export default SingleproductList;
