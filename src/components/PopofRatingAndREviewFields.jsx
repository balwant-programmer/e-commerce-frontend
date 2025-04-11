import React, { useEffect, useState } from "react";
import {
  useGetSpecifUserRatingAndReviewMutation,
  usePostTheRatingAndReviewMutation,
} from "../rtkQuery/productServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PopofRatingAndREviewFields = ({ product, singleproductData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleButtonMouseEnter = () => setIsHovered(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [
    ratingAndReview,
    { data: ratindAndReviewData, isLoading: ratingAndReviewLoading },
  ] = useGetSpecifUserRatingAndReviewMutation();

  const [trigger, { data, isLoading, error, isError, isSuccess }] =
    usePostTheRatingAndReviewMutation();

  useEffect(() => {
    if (!!product && !!singleproductData) {
      ratingAndReview(product?._id || singleproductData?.product?._id);
    }
  }, [product, singleproductData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setIsHovered(false);
      ratingAndReview(product?._id || singleproductData?.product?._id);
    }

    if (isError) {
      if (
        error?.data?.message === "No token provided, access denied" &&
        error?.data?.success === false
      ) {
        toast.warn("You are not Register !" || error?.data?.message);
        navigate("/login");
      } else {
        toast.warn("SomeThings Is Wrong !");
      }
    }
  }, [isSuccess, error]);

  const HandlereviewAndRating = (id) => {
    if (!id) {
      toast("Something is wrong!");
      return;
    }

    if (rating === 0) {
      toast("Please select the rating!");
      return;
    }

    if (!review) {
      toast("Please write a review!");
      return;
    }

    trigger({ id, rating, review });
  };

  return (
    <>
      <button
        className="underline text-sm text-end mt-16  "
        onMouseEnter={handleButtonMouseEnter}
      >
        Rate Now
      </button>
      <div>
        <div className="relative">
          {isHovered && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="bg-white px-6 py-6 rounded-lg shadow-lg opacity-100 translate-y-0 transition-all duration-300 ease-in-out"
                style={{ width: "300px" }}
              >
                <button
                  className="absolute top-2 right-2 text-3xl px-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsHovered(false)}
                >
                  X
                </button>

                <h3 className="mt-5 font-semibold text-sm text-gray-700">
                  Your Rating
                </h3>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-2xl ${
                        star <= rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Enter your review..."
                  className="w-full outline-none border-none bg-gray-100 px-4 py-2 font-serif rounded-lg mt-2"
                ></textarea>

                <div
                  className="flex justify-end mt-4"
                  onClick={() =>
                    HandlereviewAndRating(
                      product._id || singleproductData?.product?._id
                    )
                  }
                >
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg active:scale-110">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {ratindAndReviewData?.data?.rating && (
          <div className="max-w-md  px-2 py-2">
            <div className="flex justify-end gap-3 text-sm">
              <p>Your Review</p>

              {new Array(ratindAndReviewData?.data?.rating)
                .fill(0)
                .map((_, index) => (
                  <span key={index} className="text-sm text-yellow-300">
                    ★
                  </span>
                ))}
              {new Array(5 - (ratindAndReviewData?.data?.rating || 0))
                .fill(0)
                .map((_, index) => (
                  <span key={index + 5} className="text-sm text-gray-300">
                    ★
                  </span>
                ))}
            </div>
            <p className="text-sm opacity-80 break-all">
              {ratindAndReviewData?.data?.review?.substr(0, 12)}{" "}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PopofRatingAndREviewFields;
