import React from "react";

const LoadingPop = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-t-4 flex justify-center items-center border-blue-500 border-solid rounded-full animate-spin mb-4">
          <div
            className="w-10 h-10 rounded-full border-r-4
                     border-rose-900  animate-spin"
          ></div>
        </div>
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPop;
