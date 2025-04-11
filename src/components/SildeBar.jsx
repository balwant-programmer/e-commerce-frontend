import React from "react";
import PriceFilter from "./PriceFilter";
import CateoryFilter from "./CateoryFilter";
import EmojiFilter from "./EmojiFilter";
import ResetAllFilter from "./ResetAllFilter";

const SildeBar = () => {
  return (
    <div className=" overflow-y-auto h-screen mb-10">
      <div className="text-center ">
        <span className="text-rose-600 text-md">Filter Items</span>
      </div>
      <hr className="mb-4" />
      <ResetAllFilter />
      <PriceFilter />
      <hr className="mb-4" />
      <CateoryFilter />
      <hr className="mb-4" />
      <EmojiFilter />
    </div>
  );
};

export default SildeBar;
