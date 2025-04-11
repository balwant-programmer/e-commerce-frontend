import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";

import {
  useCheckUserAuthQuery,
  useLogoutMutation,
  useUserLogoMutation,
} from "../rtkQuery/userAuthservice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import EditProfileModel from "../components/EditProfileModel";
import { useSelector } from "react-redux";
import LoadingPop from "../components/LoadingPop";
import EditRPofile from "../components/EditRPofile";
import ChnagePassword from "../components/ChnagePassword";

const UserProfile = () => {
  const focus = useSelector((state) => state?.searchreducer?.focus);
  const { data, isLoading } = useCheckUserAuthQuery();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [viewaddress, setViewAddress] = useState(false);
  const [OpenEmailSend, setOpenEmailSend] = useState(false);
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const [
    userLogoFun,
    {
      data: userImageData,
      isLoading: userLogoImageLoading,
      isSuccess: userImageSuccess,
      error: userImageError,
    },
  ] = useUserLogoMutation();

  const [profileupdateCompentisopen, setprofileupdateCompentisopen] =
    useState(false);

  const HandleUserImage = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      toast("No image selected");
      return;
    }
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(selectedFile.type)) {
      toast("Please select a valid image file (jpeg, png, gif, webp)");
      return;
    }
    const formDatauserImage = new FormData();
    formDatauserImage.append("userlogo", selectedFile);
    userLogoFun(formDatauserImage);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const closeModal = () => setIsOpen(false);

  const HandleProfileUpdate = () => {
    setprofileupdateCompentisopen((pre) => !pre);
  };

  const HandleOepenemailSendOtpBox = () => {
    setOpenEmailSend((pre) => !pre);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (focus) return;
  return (
    <>
      <div
        className="flex items-center gap-x-3 py-2   select-none
       px-2 md:mt-1 md:mx-16"
      >
        <label htmlFor="userLogo" className="relative cursor-pointer">
          <input
            type="file"
            name=""
            id="userLogo"
            hidden
            onChange={HandleUserImage}
          />
          <img
            src={data?.user?.image}
            alt="Avatar"
            className="w-10 h-10 rounded-full outline-1 outline-double"
          />
          <div
            className="absolute top-5 size-4 flex justify-center items-center left-7 md:top-1 md:-left-2 rounded-full  
            bg-rose-400 outline-2 outline-double text-yellow-50"
          >
            <AddIcon fontSize="small" />
          </div>
        </label>

        <div className="text-gray-600 font-serif text-sm cursor-pointer">
          <p>{data?.user?.email}</p>
          <p className="text-[12px] ">{data?.user?.username}</p>
        </div>
      </div>

      <div
        className=" py-96 font-serif md:mx-16 flex select-none
       flex-col gap-y-3 cursor-pointer text-gray-600  px-3 pt-3  bg-white"
      >
        <hr />

        <Link
          to="/order"
          className="hover:text-gray-900 transition-all  duration-500 focus:scale-110 "
        >
          My Order
        </Link>
        <hr />
        <div className="flex justify-between" onClick={HandleProfileUpdate}>
          <p className="hover:text-rose-900 transition-all duration-500 focus:scale-110">
            update profile
          </p>{" "}
          <button
            className={`bg-gray-200 px-3 text-sm  rounded-3xl  ${
              profileupdateCompentisopen && "text-white bg-rose-600"
            }`}
          >
            {profileupdateCompentisopen ? "Leave" : "Edit"}
          </button>
        </div>
        {profileupdateCompentisopen && (
          <EditRPofile
            data={data}
            setprofileupdateCompentisopen={setprofileupdateCompentisopen}
          />
        )}
        <hr />
        <div className="flex justify-between">
          <p className="hover:text-blue-900 transition-all duration-500 focus:scale-110">
            change my password{" "}
          </p>
          <p onClick={HandleOepenemailSendOtpBox}>
            <button className="bg-gray-200 px-3 py-1 text-sm text-blue-700 rounded-3xl hover:text-blue-800 ">
              change
            </button>{" "}
          </p>
        </div>
        {OpenEmailSend && (
          <ChnagePassword setOpenEmailSend={setOpenEmailSend} data={data} />
        )}
        <hr />
        <div>
          <div className="flex justify-between">
            <p className="hover:text-red-900 transition-all duration-500 focus:scale-110">
              update address
            </p>

            <div className="flex gap-x-4">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-200 px-3 text-sm text-blue-700 rounded-3xl hover:text-blue-800 "
              >
                Edit
              </button>
              <button
                onClick={() => setViewAddress((pre) => !pre)}
                className="bg-gray-200  px-3 text-sm text-rose-700  hover:text-rose-800 rounded-3xl "
              >
                {viewaddress ? "Hidden" : "View"}
              </button>
            </div>
          </div>

          {viewaddress && (
            <div className=" font-serif px-2 pb-4">
              <hr className="mt-4 border-rose-400" />
              <div className="mt-2 md:grid grid-cols-3 flex flex-wrap justify-between gap-2">
                <p>name : {data?.user?.username}</p>
                <p>address : {data?.userAddress?.address || "XXXXX😭"}</p>
                <p>phone : +91{data?.userAddress?.phone || "XXXXXX😭"}</p>
                <p>zipCode : {data?.userAddress?.zipCode || "XXXXX😭"}</p>
                <p>HouseNo : {data?.userAddress?.houseno || "XXXXX😭"}</p>
              </div>
            </div>
          )}
        </div>
        <hr />
        <Link
          to="/cart"
          className="hover:text-green-800 active:bg-black transition-all duration-500 focus:scale-110"
        >
          <p>Your item</p>
        </Link>
        <hr />

        <Link
          to="/wishlist"
          className="hover:text-green-800 transition-all duration-500 focus:scale-110"
        >
          wishList
        </Link>
        <hr />

        <p
          className="text-rose-400 hover:cursor-pointer"
          onClick={handleLogout}
        >
          {isLogoutLoading ? <LoadingPop message="Logout" /> : "Logout"}
        </p>
      </div>
      <EditProfileModel
        isOpen={isOpen}
        closeModal={closeModal}
        data={data}
        setViewAddress={setViewAddress}
      />
      {data && userLogoImageLoading && (
        <div
          className="fixed inset-0 flex cursor-pointer items-center
    justify-center bg-opacity-0 z-[1000]  h-screen bg-gray-800 "
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default UserProfile;
