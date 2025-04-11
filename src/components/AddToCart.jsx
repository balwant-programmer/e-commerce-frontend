import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  useAddToCartMutation,
  useCartdescrementMutation,
  useDeletedCartMutation,
  useGetcartItemsQuery,
} from "../rtkQuery/productServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import CheckOut from "./CheckOut";

import { useSelector } from "react-redux";

const AddToCart = () => {
  const focus = useSelector((state) => state?.searchreducer?.focus);
  const navigate = useNavigate();
  const [EmpytCart, setCartItem] = useState();
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [DecrementId, setDecrementId] = useState(null);
  const [incrementId, setIncrementId] = useState(null);
  const [checkitem, setCheckedITem] = useState({
    checked: null,
    chechedId: null,
  });

  const {
    data: cartData,
    error: cartitemError,
    isError: cartitemsiserror,
    isLoading: cartitemIsloading,
  } = useGetcartItemsQuery();

  useEffect(() => {
    if (
      cartitemError?.status === 404 &&
      cartitemError?.data?.message === "Empty Cart" &&
      cartitemError?.data.success === false
    ) {
      setCartItem(cartitemError?.status);
    }

    if (cartitemsiserror && cartitemError) {
      if (
        cartitemError?.data?.message === "No token provided, access denied" &&
        cartitemError?.data?.success === false
      ) {
        setTimeout(() => {
          navigate("/login");
        }, 20);
      }
    }
  }, [cartData, cartitemsiserror, cartitemError]);

  const [trigger, { isLoading: IncrementLoading }] = useAddToCartMutation();
  const [decrementTrigger, { isLoading: DecrementLoading }] =
    useCartdescrementMutation();
  const [
    deletedCarttrigger,
    { isLoading: deletedLoading, isSuccess: fetchDataisSucesss },
  ] = useDeletedCartMutation();

  const HandleDcrement = (id, price) => {
    setDecrementId(id);
    const productId = id;
    decrementTrigger({ productId, price });
  };

  const HandleIncrement = (id, price, quantity) => {
    setIncrementId(id);
    const productId = id;
    trigger({ productId, quantity, price });
  };

  const HandleDelted = async (id) => {
    setDeletedItemId(id);
    const productId = id;
    const { data } = await deletedCarttrigger({ productId });
    if (data?.success) {
      toast(data?.message);
      setDeletedItemId(null);
    }
  };

  if (cartitemIsloading) {
    return <Spinner />;
  }

  const handlecheckbox = (e, id) => {
    setCheckedITem({
      checked: e.target.checked,
      checkedId: id,
    });
  };

  const HandleBack = () => {
    navigate(-1);
  };

  if (focus) return;
  return (
    <>
      {EmpytCart == 404 ? (
        <div className="flex flex-col justify-center items-center">
          <img src="/empty-cart.png" alt="" />
          <Link
            to="/"
            className="border-2 active:scale-110 px-10 font-serif text-sm text-green-500 rounded-2xl py-1 
          "
          >
            Got to Back
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-4 mb-4">
            <button
              onClick={HandleBack}
              className="bg-gray-100
               active:scale-110 px-4 mx-2 rounded font-serif text-sm text-green-500 py-1 
          "
            >
              ⤶ Back
            </button>{" "}
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-1 mb-16  md:pt-5 gap-x-10">
            {cartData?.cartitem &&
              cartData?.cartitem?.map(
                ({ name, image, quantity, price, _id }) => (
                  <div key={_id} className="border-2 col-span-2 p-1">
                    <div className="flex bg-gray-200 p-2">
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="border-2 border-gray-300 p-2 rounded-lg">
                          <img src={image} alt={name} className="h-10 w-10" />
                        </div>
                        <p>{name}</p>
                        <div className="flex px-3 gap-x-3 bg-gray-200 py-2 items-center justify-center">
                          <button
                            onClick={() => HandleDcrement(_id, price, quantity)}
                            className="bg-black rounded-full active:scale-110 h-5 w-5 flex justify-center items-center text-green-400"
                          >
                            {DecrementLoading && DecrementId === _id ? (
                              <div className="size-4 animate-spin border-2 border-t-rose-600 rounded-full"></div>
                            ) : (
                              "-"
                            )}
                          </button>
                          <p className="font-serif text-sm">
                            Quantity{" "}
                            <span className="text-green-400">{quantity}</span>
                          </p>
                          <button
                            onClick={() =>
                              HandleIncrement(_id, price, quantity)
                            }
                            className="bg-black rounded-full h-5 w-5 active:scale-110 flex justify-center items-center text-green-400"
                          >
                            {IncrementLoading && incrementId === _id ? (
                              <div className="size-4 animate-spin border-2 border-t-rose-600 rounded-full"></div>
                            ) : (
                              "+"
                            )}
                          </button>
                        </div>
                        <div className="text-sm flex flex-col items-center">
                          <span>
                            <CurrencyRupeeIcon fontSize="small" />
                            <span>{price * quantity}</span>
                            <div className="text-[7px]">
                              {Math.round((price * quantity) / quantity)}/per
                              item
                            </div>
                          </span>
                        </div>
                        <div className="flex mt-1 mx-16 items-center cursor-pointer gap-x-16 text-sm px-2 md:text-md font-serif">
                          <div className="text-red-400 cursor-pointer active:scale-110">
                            <span onClick={() => HandleDelted(_id)}>
                              {deletedLoading && deletedItemId === _id ? (
                                <div className="size-4 border-black border-2 border-t-yellow-300 animate-spin rounded-full"></div>
                              ) : (
                                <DeleteIcon fontSize="small" />
                              )}
                            </span>
                          </div>
                          <div className="cursor-pointer">
                            <input
                              onChange={(e) => handlecheckbox(e, _id)}
                              type="checkbox"
                              name=""
                              id=""
                              className="cursor-pointer size-7"
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            <CheckOut checkitem={checkitem} />
          </div>
        </>
      )}
    </>
  );
};

export default AddToCart;
