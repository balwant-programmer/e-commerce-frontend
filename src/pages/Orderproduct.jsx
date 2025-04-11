import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  useGetOrderProductQuery,
  useOrderCancelMutation,
} from "../rtkQuery/productServices";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link, useNavigate } from "react-router-dom";
import LoadingPop from "../components/LoadingPop";
import { toast } from "react-toastify";

const OrderProduct = () => {
  const navigate = useNavigate();
  const [open, setOpenModel] = useState(false);

  const {
    data: orderData,
    error: orderError,
    isError: orderIsError,
    isLoading: orderIsLoading,
    refetch,
  } = useGetOrderProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [
    trigger,
    {
      data: orderCancelData,
      error: orderCancelError,
      isError: orderisError,
      isLoading: orderCancelIsloading,
      isSuccess: orderISuccess,
    },
  ] = useOrderCancelMutation();

  useEffect(() => {
    if (
      orderError?.data?.message === "No token provided, access denied" &&
      orderError?.data?.success === false &&
      orderError?.status === 401
    ) {
      navigate("/login");
    }
  }, [orderError, orderCancelError]);

  useEffect(() => {
    if (orderISuccess) {
      refetch();

      toast("Your Product Cancel Success !");
    }
  }, [orderISuccess]);

  const HandleCancel = async (cashOnDelevery, orderId, productId) => {
    if (cashOnDelevery) {
      await trigger({ orderId, productId });
    } else {
      setOpenModel(true);
    }
  };

  const closeModal = () => setOpenModel(false);

  if (orderError?.status === 404 && orderError?.data?.success === false) {
    return (
      <div className="flex flex-col h-full w-full bg-cover  bg-center  bg-no-repeat justify-center items-center bg-[url('/Emptybox.webp')]">
        <Link
          to="/"
          className="bg-green-700 px-4 rounded-lg py-1 text-white font-serif active:scale-110"
        >
          Order Now
        </Link>
      </div>
    );
  }

  if (orderIsLoading) {
    return (
      <div
        className="flex justify-center items-center  mx-auto   mt-10 size-8 border-t-2 border-rose-600 animate-spin
       rounded-full"
      >
        <div className="size-6  rounded-full animate-spin border-r-2  border-red-400 flex justify-center items-center"></div>
      </div>
    );
  }
  if (orderIsError) {
    return (
      <div className="text-center text-lg text-red-500">
        Error: {orderError?.message || "Something went wrong!"}
      </div>
    );
  }

  return (
    <div className="md:mt-2  mb-16 font-serif text-sm ">
      <h2 className="font-serif   bg-black  p-3  sm:bg-white text-rose-500">
        {orderData?.message}
      </h2>
      <div className="flex items-center  w-full mb-2 pb-4 bg-black text-rose-300 ">
        <div className="flex flex-col items-center">
          <p className="font-serif text-red-400">Pending</p>
        </div>
        <div className="flex-grow border-t-2  mx-4"></div>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-200">Processing</p>
        </div>
        <div className="flex-grow border-t-2 border-gray-300 mx-4"></div>{" "}
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-200">Confirm</p>
        </div>
      </div>

      <div>
        {orderData?.order?.map(
          (
            { amount, orderData, cashOnDelevery, _id, createdAt },
            orderIndex
          ) => (
            <div key={orderIndex}>
              {orderData?.map(
                ({ name, image, quantity, price, productId }, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-2 gap-4 p-2 border-b-2"
                  >
                    <div className="p-1 border-2 border-green-400 rounded-xl h-36 w-36 md:h-52 md:w-52 mb-2">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-contain rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-2 space-y-2">
                      <p className="font-semibold">{name}</p>
                      <div className="flex justify-between">
                        <p>Qty: {quantity}</p>
                        <p>₹{price}/per</p>
                        <div className="hidden sm:block text-green-900">
                          <p>Order Data & Time</p>
                          <p>
                            {new Date(createdAt).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              hour12: true,
                            })}
                          </p>{" "}
                        </div>
                      </div>
                      <div className="font-bold text-md">
                        Total : ₹{price * quantity}
                      </div>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg mt-2 hover:bg-red-700 transition duration-300"
                        onClick={() =>
                          HandleCancel(cashOnDelevery, _id, productId)
                        }
                      >
                        Cancel
                      </button>
                      {cashOnDelevery && (
                        <div className=" gap-x-3 hidden md:block">
                          <p>
                            You Buy : Cash On Delevery : ₹{price * quantity}{" "}
                          </p>
                        </div>
                      )}
                      {!cashOnDelevery && (
                        <div className=" md:block">
                          <h2 className="text-center">payement Details </h2>
                          <p className="flex justify-center gap-3">
                            Paid : ₹{amount}
                            <CheckCircleOutlineIcon
                              className="text-green-400"
                              fontSize="small"
                            />{" "}
                          </p>
                        </div>
                      )}
                    </div>
                    {cashOnDelevery && (
                      <div className=" gap-x-3 md:hidden font-serif texts-sm text-green-900">
                        <p>You Buy : Cash On Delevery ₹{price * quantity} </p>
                      </div>
                    )}
                    <div className="md:hidden text-yellow-700 font-serif ">
                      <p className="text-sm">Order Data & Time</p>
                      <p className="text-sm">
                        {new Date(createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          hour12: true,
                        })}
                      </p>{" "}
                    </div>
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel="Edit Profile Modal"
        className="modal bg-gray-900 p-6 mx-1 text-white font-serif rounded-lg w-full max-w-md z-50"
        overlayClassName="overlay fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <p className="mb-7">
          {" "}
          Sorry Con't Delete, if you Cancel your product then Contcat with Team
          afte the Paid Online
        </p>
        <Link
          to="/contact"
          className="bg-green-6 font-serif bg-green-600 text-sm  px-4 rounded-md py-2 "
        >
          Conact
        </Link>
      </Modal>

      {orderCancelIsloading && <LoadingPop />}
    </div>
  );
};

export default OrderProduct;
