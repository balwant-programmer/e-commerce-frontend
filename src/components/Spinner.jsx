import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full ">
      <div
        className="size-10 sm:size-6 border-2 border-gray-200 rounded-full flex items-center justify-center
       border-t-slate-400 border-l-slate-400  outline-2    animate-spin"
      ></div>
    </div>
  );
};

export default Spinner;
