import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCheckUserAuthQuery,
  useUserprfileupdateMutation,
} from "../rtkQuery/userAuthservice";

const EditProfile = ({ setprofileupdateCompentisopen, data: userData }) => {
  const [email, setEmail] = useState(userData?.user?.email || "");
  const [username, setName] = useState(userData?.user?.username || "");
  const [trigger, { data, isLoading, error, isError }] =
    useUserprfileupdateMutation();
  const HandleSave = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.warn("Name cannot be empty");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.warn("Please enter a valid email");
      return;
    }
    const lowercaseEmail = email.toLowerCase();
    trigger({ username, email: lowercaseEmail });
  };
  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
      setprofileupdateCompentisopen(false);
    }
  }, [data]);
  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.message || "An error occurred while updating your profile."
      );
    }
  }, [isError, error]);

  return (
    <div className="mx-2 p-1">
      <form onSubmit={HandleSave}>
        <div className="py-2 mb-4 rounded-md">
          <input
            value={username}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="update name"
            className="w-full p-2
             outline-none  border-none bg-gray-200 px-4 rounded-ss-md"
          />
        </div>

        <div className="mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-2
            outline-none  border-none bg-gray-200 px-4 rounded-ss-md"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-7 bg-gradient-to-r p-1 to-rose-500 w- flex items-center gap-2 w-24 via-green-400 from-orange-200 text-white font-serif rounded-md active:scale-110"
        >
          Save
          {isLoading && (
            <div className="border-2 p-1 rounded-full border-t-blue-400 animate-spin"></div>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
