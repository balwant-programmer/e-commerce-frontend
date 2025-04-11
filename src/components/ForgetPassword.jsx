import React, { useEffect, useState } from "react";
import { useSendotpMutation } from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VeryFiledPasswordandEmail from "./VeryFiledPasswordandEmail";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [Optsend, setOptsend] = useState(false);
  const [
    trigger,
    { data: sendOtpData, isLoading: sendOtpisLoading, error, isError },
  ] = useSendotpMutation();

  const HandleSendOtp = () => {
    if (!email) {
      return toast("Please fill your Email !");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return toast("Invalid Email  !");
    }

    trigger({ email });
  };

  useEffect(() => {
    if (sendOtpData && sendOtpData.success) {
      toast.success(sendOtpData.message);
      setOptsend(true);
    }
  }, [sendOtpData]);

  useEffect(() => {
    if (isError) {
      toast.error("Somthings is Wrong !");
    }
    console.log(error);
  }, [error, isError]);

  if (Optsend) {
    return <VeryFiledPasswordandEmail email={email} setOptsend={setOptsend} />;
  }

  return (
    <div className="flex  justify-center mt-10 font-serif min-h-screen ">
      <div className=" p-8 max-w-sm w-full">
        <div className="text-sm gap-x-24 flex justify-start  font-semibold text-center mb-4">
          <Link to="/" className="active:bg-gray-200 p-2 rounded-full">
            <KeyboardBackspaceIcon />
          </Link>
          <p>Forgot Password</p>
        </div>

        <div className="mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            className="mt-2 p-3 border  rounded-lg w-full outline-none border-none bg-gray-200 px-4"
            placeholder="Your email"
          />
        </div>

        <div
          onClick={HandleSendOtp}
          className="w-full mb-2 bg-gradient-to-br to-blue-500 via-rose-600 from-orange-300
           text-white p-3 rounded-md flex justify-center items-center gap-x-2 text-sm gap-2"
        >
          <button>Send OTP</button>
          {sendOtpisLoading && (
            <div className="border-2 border-t-teal-300 size-4 animate-spin rounded-full"></div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
