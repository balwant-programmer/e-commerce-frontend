import React, { useEffect, useState } from "react";
import {
  useCheckUserAuthQuery,
  useSendotpMutation,
} from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";
import OtpandpasswordFrom from "./OtpandpasswordFrom";

const ChnagePassword = ({ data, setOpenEmailSend }) => {
  const [email, setEmail] = useState(data?.user?.email);
  const [optsend, setOptsend] = useState(false);

  const [
    trigger,
    { data: sendOtpData, isLoading: sendOtpisLoading, error, isError },
  ] = useSendotpMutation();
  const HandleOtp = () => {
    if (!email) return toast.warn("Somethings is Wrong !");
    trigger({ email });
  };

  useEffect(() => {
    if (sendOtpData && sendOtpData.success) {
      toast.success(sendOtpData.message);
      console.log(sendOtpData);
      setOptsend(true);
    }
  }, [sendOtpData]);

  useEffect(() => {
    if (isError) {
      toast.error("Somthings is Wrong !");
    }
    console.log(error);
  }, [error, isError]);

  if (optsend) {
    return (
      <OtpandpasswordFrom
        setOpenEmailSend={setOpenEmailSend}
        data={data}
        setOptsend={setOptsend}
      />
    );
  }

  return (
    <div>
      <div className="mb-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full p-2
          
            outline-none  border-none bg-gray-200 px-4 rounded-ss-md"
          readOnly
        />
      </div>
      <p>
        <div
          onClick={HandleOtp}
          className="px-7 bg-gradient-to-r p-1 mx-auto to-rose-500 w- flex items-center gap-2 w-24 via-green-400 from-orange-200 text-white font-serif rounded-md active:scale-110"
        >
          <button type="submit" disabled={sendOtpisLoading}>
            send
          </button>
          {sendOtpisLoading && (
            <div className="border-2 p-1 rounded-full border-t-blue-400 animate-spin"></div>
          )}
        </div>
      </p>
    </div>
  );
};

export default ChnagePassword;
