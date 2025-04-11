import React, { useEffect, useState } from "react";
import { useGetReviewAndRatingAllQuery } from "../rtkQuery/productServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const RatingAndReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: ratingandReviewData,
    isError: ratingAndReviewError,
    isSuccess: raitngAndReviewSucces,
    isLoading: ratingAndReviewLoading,
  } = useGetReviewAndRatingAllQuery(id);
  const { RatingAndReview, product, user, totalReviewAndRating } =
    ratingandReviewData || {};

  const userData = [];
  RatingAndReview?.forEach(({ userId, review, rating }) => {
    user?.forEach((user) => {
      user?.forEach(({ _id, image, username }) => {
        console.log("user Id", _id === userId);
        if (_id === userId) {
          userData.push({ review, rating, image, username });
        }
      });
    });
  });
  const value = [];
  RatingAndReview?.forEach(({ rating }) => {
    value.push(rating);
  });
  const ratingCounts = [0, 0, 0, 0, 0];
  value.forEach((rating) => {
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1] += 1;
    }
  });
  if (ratingandReviewData?.RatingAndReview?.length === 0) {
    return (
      <div>
        <div className="flex justify-center items-center text-3xl    font-serif h-64 text-green-400">
          <div>no any Review found !</div>
        </div>
        <div
          className="flex justify-center active:scale-110"
          onClick={() => navigate(-1)}
        >
          <button className="bg-gray-300 px-2   rounded-2xl">👈 Back</button>
        </div>
      </div>
    );
  }

  const totalRatings = value.length;

  const ratingPercentages = ratingCounts.map(
    (count) => (count / totalRatings) * 100
  );

  if (ratingAndReviewLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div onClick={() => navigate(-1)} className="pt-2 flex md:hidden ">
        <p className="bg-slate-100 px-5 rounded-tr-3xl text-green-600 py-1 text-sm font-serif cursor-pointer active:scale-105">
          <span className="text-green-500 text-md">⤶</span> Back
        </p>
      </div>

      <div
        onClick={() => navigate(-1)}
        className="absolute left-32 top-16 hidden md:block"
      >
        <p className="bg-slate-100 px-5 rounded-tr-3xl text-green-600 py-1 text-sm font-serif cursor-pointer active:scale-105">
          <span className="text-green-500 text-md">⤶</span> Back
        </p>
      </div>

      <div className="p-2 md:p-4 grid grid-cols-1  lg:grid-cols-3 md:grid-cols-` md:grid-flow-row  gap-6 mb-10">
        <div className="flex justify-center">
          <img
            src={product?.image}
            alt="Product"
            className="w-full h- md:h-96  rounded-lg shadow-lg max-w-xs md:max-w-full"
          />
        </div>

        <div className="space-y-4 ">
          <h2 className="text-xl font-semibold">Customer Ratings & Reviews</h2>
          <div>
            <p className="text-lg font-medium">
              Total Reviews: {totalReviewAndRating} and Rating{" "}
              {totalReviewAndRating}
            </p>
            <div className="space-y-2">
              {ratingPercentages.map((percentage, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-3"
                >
                  <span>{index + 1} Star:</span>
                  <div className="w-full bg-gray-200 h-2 rounded-full relative">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(percentage)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {userData &&
            userData?.map(({ username, rating, review, image }) => (
              <div className="bg-gray-100 p-4 mb-4 flex items-center space-x-4">
                <img
                  src={image}
                  alt={username}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-bold text-lg">{username}</p>

                  <div className="flex space-x-1">
                    {new Array(rating).fill(0).map((_, index) => (
                      <span key={index} className="text-yellow-400">
                        &#9733;
                      </span>
                    ))}
                    {new Array(5 - rating).fill(0).map((_, index) => (
                      <span key={index + rating} className="text-gray-300">
                        &#9733;
                      </span>
                    ))}
                  </div>

                  <p className="mt-2 text-sm text-gray-500 font-medium break-words text-balance">
                    {review}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;
