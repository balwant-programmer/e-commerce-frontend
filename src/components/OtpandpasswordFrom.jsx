import React, { useEffect, useState } from "react";
import { useVeryFiedOtpMutation } from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const OtpandpasswordFrom = ({ data, setOptsend, setOpenEmailSend }) => {
  const [trigger, { data: chnagePaswordData, isLoading, error, isError }] =
    useVeryFiedOtpMutation();
  const [password, setpassword] = useState("");
  const [sendotp, setotp] = useState("");

  const HandleChangePassword = () => {
    const email = data?.user?.email;
    const otp = sendotp.trim();
    const newpassword = password.trim();
    if (!(otp.length === 6)) {
      toast.warn("Please Enter 6 Digits Otp !");
      return;
    }
    if (!newpassword || !otp) {
      return toast.warn("all fields Required !");
    }
    trigger({ email, newpassword, otp });
  };

  useEffect(() => {
    if (chnagePaswordData && chnagePaswordData.success) {
      toast.success(chnagePaswordData?.message);
      setOpenEmailSend(false);
    }
  }, [chnagePaswordData]);

  useEffect(() => {
    if (isError) {
      if (error.status === 404 && error.data.success === false) {
        toast(error.data.message);
      }
    }
  }, [error, isError]);

  const handlback = () => {
    setOptsend(false);
  };

  return (
    <div>
      <div className="mb-3" onClick={handlback}>
        <KeyboardBackspaceIcon />
      </div>
      <div className="mb-4">
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="password"
          className="w-full p-2
      outline-none  border-none bg-gray-200 px-4 rounded-ss-md"
        />
      </div>
      <div className="mb-4">
        <input
          value={sendotp}
          onChange={(e) => setotp(e.target.value)}
          type="number"
          placeholder="Enter otp"
          className="w-full p-2
      outline-none  border-none bg-gray-200 px-4 rounded-ss-md"
        />
      </div>
      <button
        onClick={HandleChangePassword}
        className="px-3 bg-gradient-to-r p-1 mx-auto
         to-rose-900 w- flex items-center gap-2 w-24
          via-green-900 from-orange-900 text-white font-serif rounded-md active:scale-110"
      >
        change
        {isLoading && (
          <div className="border-2 p-1 rounded-full border-t-blue-400 animate-spin"></div>
        )}
      </button>
    </div>
  );
};

export default OtpandpasswordFrom;
