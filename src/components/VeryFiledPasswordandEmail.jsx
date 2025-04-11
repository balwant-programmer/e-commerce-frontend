import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useVeryFiedOtpMutation } from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VeryFiledPasswordandEmail = ({ email, setOptsend }) => {
  const navigate = useNavigate();
  const [trigger, { data: chnagePaswordData, isLoading, error, isError }] =
    useVeryFiedOtpMutation();
  const [OtpData, setOtpData] = useState("");
  const [password, setpassword] = useState("");

  const HandlechangePass = () => {
    if (!password || !OtpData) {
      return toast("Please fill your all Fileds !");
    }
    const otp = OtpData.trim();
    const newpassword = password.trim();
    if (!(otp.length === 6)) {
      toast.warn("Please Enter 6 Digits Otp !");
      return;
    }
    if (!newpassword || !otp) {
      return toast.warn("all fields Required !");
    }
    trigger({ newpassword, otp, email });
  };

  useEffect(() => {
    if (chnagePaswordData && chnagePaswordData.success) {
      toast.success(chnagePaswordData?.message);
      navigate("/login");
    }
  }, [chnagePaswordData]);

  useEffect(() => {
    if (isError) {
      if (error.status === 404 && error.data.success === false) {
        toast(error.data.message);
      }
    }
  }, [error, isError]);

  return (
    <div className="flex  justify-center mt-10 font-serif min-h-screen ">
      <div className=" p-8 max-w-sm w-full">
        <div className="text-sm gap-x-24 flex justify-start  font-semibold text-center mb-4">
          <button
            onClick={() => setOptsend(false)}
            className="active:bg-gray-200 p-2 rounded-full"
          >
            <KeyboardBackspaceIcon />
          </button>

          <p>Forgot Password</p>
        </div>

        <div className="mb-4">
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            id="new password"
            className="mt-2 p-3 border  rounded-lg w-full outline-none border-none bg-gray-200 px-4"
            placeholder="new password"
          />
        </div>
        <div className="mb-4">
          <input
            value={OtpData}
            onChange={(e) => setOtpData(e.target.value)}
            type="number"
            id="otp"
            className="mt-2 p-3 border  rounded-lg w-full outline-none border-none bg-gray-200 px-4"
            placeholder="Enter otp"
          />
        </div>
        <div
          onClick={HandlechangePass}
          className="w-full mb-2 bg-gradient-to-br to-blue-500 via-rose-600 from-orange-300
         text-white p-3 rounded-md cursor-pointer   flex justify-center items-center gap-x-2 text-sm gap-2"
          disabled={isLoading}
        >
          <button disabled={isLoading}>change</button>
          {isLoading && (
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

export default VeryFiledPasswordandEmail;
