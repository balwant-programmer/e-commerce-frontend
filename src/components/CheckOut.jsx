import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetcartItemsQuery } from "../rtkQuery/productServices";
import CheckoutOfthePayement from "./CheckoutOfthePayement";
import { toast } from "react-toastify";

const CheckOut = ({ checkitem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isSuccess } = useGetcartItemsQuery();
  const [totalPriceandquantity, setTotalPrice] = useState({
    totalpriceitem: 0,
    totalQuantityItem: 0,
  });
  let cartData = useSelector(
    (state) => state?.api?.queries["getcartItems(undefined)"]?.data?.cartitem
  );
  const [crtitemData, setCartITemData] = useState([]);

  const error = useSelector(
    (state) => state?.api?.queries["getcartItems(undefined)"]?.error
  );

  useEffect(() => {
    let totalprice = 0;
    let totalQuantity = 0;
    crtitemData?.forEach(({ price, quantity }) => {
      totalprice += price * quantity;
      totalQuantity += quantity;
    });
    setTotalPrice({
      totalpriceitem: totalprice,
      totalQuantityItem: totalQuantity,
    });
  }, [crtitemData]);

  useEffect(() => {
    if (!checkitem.checked) {
      setCartITemData((preData) => {
        return preData?.filter(
          ({ productId }) => productId !== checkitem?.checkedId
        );
      });
    }
    if (checkitem.checked) {
      const data = cartData.filter(
        ({ productId }) => productId === checkitem?.checkedId
      );
      setCartITemData((preData) => [...preData, ...data]);
    }
  }, [checkitem]);

  useEffect(() => {
    setCartITemData(cartData);
    let totalprice = 0;
    let totalQuantity = 0;
    cartData?.forEach(({ price, quantity }) => {
      console.log(price);
      totalprice += price * quantity;
      totalQuantity += quantity;
    });
    setTotalPrice({
      totalpriceitem: totalprice,
      totalQuantityItem: totalQuantity,
    });
  }, [cartData]);

  const HandleCheckout = () => {
    if (crtitemData.length === 0) {
      toast("Please Select Cart !");
      return;
    }
    if (crtitemData.length > 0) {
      setIsOpen(true);
      return;
    }
  };

  return (
    <>
      <div className=" w-60 mx-2 bg-gray-100    p-3 mt-3  lg:fixed lg:right-2">
        <div>
          <h2 className="md:text-md hidden sm:block font-serif  text-center text-sm text-gray-700 mb-6">
            Checkout
          </h2>
          <div className="space-y-4">
            <h3 className="sm:text-xl  text-sm font-semibold text-gray-700 font-serif">
              Your Cart
            </h3>
            <div className="border-t border-b py-4 font-serif">
              {crtitemData &&
                crtitemData?.map(({ name, price, quantity, _id }) => (
                  <div
                    key={_id?.toString() + name}
                    className="flex justify-between text-gray-700"
                  >
                    <p>{name}</p>
                    <p>₹ {price * quantity}</p>
                  </div>
                ))}
            </div>
            <div className="flex justify-between">
              <p>quantity</p>
              <p>
                {" "}
                <p>{totalPriceandquantity?.totalQuantityItem}</p>
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>total</p>
              <p>₹ {totalPriceandquantity?.totalpriceitem}</p>
            </div>
            <div className="bg-gray-400" onClick={HandleCheckout}>
              <button
                className="w-full bg-rose-600 text-white
             py-2 font-serif text-sm rounded-md md:text-md hover:bg-rose-700
              transition duration-300 ease-in-out"
              >
                Payment Checkout
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      <div>
        <CheckoutOfthePayement
          totalPriceandquantity={totalPriceandquantity}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          crtitemData={crtitemData}
        />
      </div>
    </>
  );
};

export default CheckOut;
