import React from "react";

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div
      className="bg-red-100 p-8 rounded-lg shadow-lg  max-w-2xl
     mx-auto fixed top-32 left-1/2 md:top-64 transform -translate-x-1/2"
    >
      <h2 className="text-red-600 text-4xl font-semibold text-center">
        {errorMessage || "Something went wrong. Please try again."}
      </h2>
      <p className="text-red-500 text-lg mt-4 text-center">
        We encountered an issue while processing your request. Please check your
        connection or try again later.
      </p>
    </div>
  );
};

export default ErrorComponent;
