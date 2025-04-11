import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Contact = () => {
  const [sms, setSms] = useState("");

  const HandleSms = (e) => {
    e.preventDefault();
    if (!sms) {
      toast("Please Fill problem Sms !");
      return;
    }
    toast.success("send Success ! problem");
    return;
  };

  const focus = useSelector((state) => state?.searchreducer?.focus);
  if (focus) return;
  return (
    <div className="sm:mt-3 m-10 font-serif ">
      <div className="mb-2 text-center">Help Center 24/7</div>
      <form>
        <div>
          <input
            onChange={(e) => setSms(e.target.value)}
            type="textarea"
            name=""
            id=""
            placeholder="send problem"
            className="bg-gray-200 text-white p-10"
          />
        </div>
        <button
          onClick={HandleSms}
          className="mt-5 bg-rose-400 px-3 rounded-lg text-white"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default Contact;
