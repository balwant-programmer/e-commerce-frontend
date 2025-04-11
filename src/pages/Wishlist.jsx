import React from "react";
import { Link } from "react-router-dom";
import { useUserwishlistGetQuery } from "../rtkQuery/userAuthservice";

const Wishlist = () => {
  const { data } = useUserwishlistGetQuery();

  console.log(data);
  if (data && data?.wishlistData?.length == 1) {
    return (
      <div className="h-64 flex flex-col font-serif gap-y-10 justify-center items-center">
        <p>You Are not Save any Product</p>
        <Link to="/" className=" px-4 border-2">
          Save product{" "}
        </Link>
      </div>
    );
  }
  return (
    <div className="mb-10 mt-2">
      <h2 className="text-center">Your Saved Product!</h2>
      {data?.wishlistData?.map((arr, index) => (
        <div key={index}>
          {arr.map((item) => (
            <div key={item._id} className="font-serif p-1 rounded-md">
              <div className="grid gap-2 border-2 p-2 grid-cols-2">
                <img src={item.image} alt="product" className="rounded-xl" />
                <div>
                  <p>{item.name}</p>
                  <p className="text-gray-500 text-balance mx-1">
                    {item.description}
                  </p>
                  <p className="text-rose-500 text-balance mx-1">
                    price ₹{item.price}
                  </p>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-rose-800 underline"
                  >
                    More Details
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
