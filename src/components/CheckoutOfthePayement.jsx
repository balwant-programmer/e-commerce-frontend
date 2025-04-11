import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {
  useCreatePaymentIntentMutation,
  useProductOrderMutation,
} from "../rtkQuery/productServices";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useCreateuserAddressMutation } from "../rtkQuery/userAuthservice";
import { useNavigate } from "react-router-dom";
import LoadingPop from "./LoadingPop";

Modal.setAppElement("#root");
const CheckoutOfthePayement = ({
  isOpen,
  setIsOpen,
  crtitemData,
  totalPriceandquantity,
}) => {
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [houseno, setHouseNo] = useState("");
  const [cashOnDelevery, setCashOnDelevery] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [AddressView, setAddressView] = useState(false);
  const navigate = useNavigate();
  const [paymentProcecing, setPaymentProcessing] = useState(false);

  const [triggerpayement, { isLoading: paymenetLaoding, error }] =
    useCreatePaymentIntentMutation();
  const [
    triggerOrder,
    { data: createOrderData, isLoading: createOrdeIsloading },
  ] = useProductOrderMutation();
  const [
    trigger,
    {
      data: createAddressData,
      error: createAddressError,
      isLoading: createAddresIsloading,
      isSuccess,
    },
  ] = useCreateuserAddressMutation();

  const {
    address: userAddress,
    phone: userPhonenumber,
    houseno: userHouseNumber,
    zipCode: userZipcode,
  } = useSelector(
    (state) =>
      state?.api?.queries["checkUserAuth(undefined)"]?.data?.userAddress || {}
  );
  useEffect(() => {
    if (!userAddress || !userPhonenumber || !userHouseNumber || !userZipcode) {
      setAddressView(true);
    } else {
      setAddressView(false);
    }
  }, []);

  useEffect(() => {
    setAddress(userAddress);
    setPhoneNumber(userPhonenumber);
    setHouseNo(userHouseNumber);
    setZipCode(userZipcode);
  }, [createAddressData, isSuccess]);

  const validateIndianPhoneNumber = (phone) => {
    const phoneWithCode = `+91${phone}`;
    const phoneRegex = /^\+91[789]\d{9}$/;
    return phoneRegex.test(phoneWithCode);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhoneNumber(input);
  };

  const HandlePayementCheckout = async () => {
    setPaymentProcessing(true);
    if (cashOnDelevery) {
      try {
        if (!address || !phone || !zipCode || !houseno) {
          toast.warn("All Fields Required !");
          setPaymentProcessing(false);
          return;
        }
        if (!validateIndianPhoneNumber(phone)) {
          toast("Invalid phone number");
          setPaymentProcessing(false);
          return;
        }
        if (address.trim().length < 5) {
          toast("YOUR ADDRESS IS TOO SHORT , NOT ALLOW !");
          setPaymentProcessing(false);
          return;
        }
        await trigger({ houseno, zipCode, phone, address });
        await triggerOrder({ crtitemData, cashOnDelevery });
        setPaymentProcessing(true);
        toast.success("order successful!");
        navigate("/order");
        setIsOpen(false);
      } catch (error) {
        toast.error("Error processing payment request.");
        setPaymentProcessing(false);
        console.error(error);
      }
    } else {
      if (!address || !phone || !zipCode || !houseno) {
        toast.warn("All Fields Required !");
        setPaymentProcessing(false);
        return;
      }
      if (!validateIndianPhoneNumber(phone)) {
        toast("Invalid phone number");
        setPaymentProcessing(false);
        return;
      }
      if (address.trim().length < 5) {
        toast("YOUR ADDRESS IS TOO SHORT , NOT ALLOW !");
        setPaymentProcessing(false);
        return;
      }
      try {
        const orderData = {
          cartData: crtitemData,
        };
        const { data, error } = await triggerpayement(orderData);
        if (error) {
          toast.error("Error creating payment intent.");
          console.error(error);
          setPaymentProcessing(false);
          return;
        }
        const clientSecret = data.clientSecret;
        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });
        if (stripeError) {
          toast.error(stripeError.message);
          setPaymentProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
          await trigger({ houseno, zipCode, phone, address });
          await triggerOrder({ crtitemData, cashOnDelevery });
          setPaymentProcessing(true);
          toast.success("order successful!");
          navigate("/order");
          setIsOpen(false);
        }
      } catch (error) {
        toast.error("Error processing payment request.");
        setPaymentProcessing(false);
        console.error(error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="bg-gray-900 h-full overflow-y-auto text-gray-300 font-serif md:p-8 p-5 select-none text-sm md:text-md"
    >
      <div className="md:mt-10">
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-100"
        >
          <div className="bg-gray-600 rounded-full size-6 flex justify-center items-center">
            <CloseIcon fontSize="small" />
          </div>
        </button>
      </div>
      <div className="grid md:grid-cols-3 md:space-x-3 mb-32 md:mt-2">
        <div className="md:col-span-2 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="mt-2 ">Order Details</h2>
            <button
              className="underline"
              onClick={() => setAddressView((prev) => !prev)}
            >
              Change Address
            </button>
          </div>
          {AddressView ? (
            <form className="space-y-4 w-full">
              <div>
                <label className="block text-sm mb-2">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter your address"
                  className="w-full p-3 bg-gray-800 rounded outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input
                  value={phone}
                  onChange={handlePhoneChange}
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full p-3 bg-gray-800 rounded outline-none"
                />
              </div>
              <div className="flex gap-x-2">
                <div>
                  <label className="block text-sm mb-2">Zip Code</label>
                  <input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    type="text"
                    placeholder="Enter zip code"
                    className="w-full p-3 bg-gray-800 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">House No</label>
                  <input
                    value={houseno}
                    onChange={(e) => setHouseNo(e.target.value)}
                    type="text"
                    placeholder="house no"
                    className="w-full p-3 bg-gray-800 rounded outline-none"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className=" font-serif px-2 pb-4">
              <hr className="mt-4 border-rose-400" />
              <div className="mt-2 md:grid grid-cols-3 flex flex-wrap justify-between gap-2">
                <p>address : {userAddress || "XXXXX😭"}</p>
                <p>phone : +91 {userPhonenumber || "XXXX😭"}</p>
                <p>zipCode : {userZipcode || "XXXXX😭"}</p>
                <p>HouseNo : {userHouseNumber || "XXXXX😭"}</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 bg-gray-800 text-white p-3">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#ffffff",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "#e0e0e0",
                  },
                },
              },
            }}
          />

          <div className="mt-10">
            <hr />
          </div>
          <div className="flex justify-between mt-10">
            <p>Cash on Delevery Free</p>
            <input
              type="checkbox"
              name=""
              id=""
              className="size-7"
              onChange={(e) => setCashOnDelevery(e.target.checked)}
            />
          </div>
        </div>

        <div className="mt-10 bg-gray-800 p-4 grid grid-cols-1 lg:w-[900px] md:lg:w-[700px] rounded-md mb-1">
          <h2 className="font-semibold mb-4">Proceed to Payment</h2>
          {crtitemData?.map(({ price, name, image, quantity }, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-2 border-t-gray-800 border-green-400 rounded-r-3xl"
            >
              <div className="p-2 rounded-md flex outline-double outline-1">
                <img src={image} alt={name} height={50} width={50} />
              </div>
              <p>{name}</p>
              <p>₹{price}</p>
              <p>Q {quantity}</p>
            </div>
          ))}
          <div className="flex justify-between mt-3 mb-5">
            <p>Quantity</p>
            <p>{totalPriceandquantity?.totalQuantityItem}</p>
          </div>
          <hr />
          <div className="flex justify-between mt-4 mb-2">
            <p>Total Price</p>
            <p>₹ {totalPriceandquantity?.totalpriceitem}</p>
          </div>

          <button
            onClick={HandlePayementCheckout}
            className="w-full bg-green-500 hover:bg-green-600 mt-5 text-white py-2 rounded"
          >
            {paymentProcecing ? (
              <LoadingPop message="processing your order.." />
            ) : (
              "order Now"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutOfthePayement;
