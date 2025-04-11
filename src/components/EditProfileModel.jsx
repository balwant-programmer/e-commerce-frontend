import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useCreateuserAddressMutation } from "../rtkQuery/userAuthservice";

const EditProfileModel = ({ isOpen, closeModal, data, setViewAddress }) => {
  const {
    address: useraddress,
    houseno: userHouseNo,
    zipCode: userZipCode,
    phone: userPhone,
  } = data?.userAddress || {};

  const [
    trigger,
    { data: createAddressData, isLoading, isError, error, isSuccess },
  ] = useCreateuserAddressMutation();
  const [address, setAddress] = useState();
  const [phone, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [houseno, setHouseNo] = useState("");

  const validateIndianPhoneNumber = (phone) => {
    const phoneWithCode = `+91${phone}`;
    const phoneRegex = /^\+91[789]\d{9}$/;
    return phoneRegex.test(phoneWithCode);
  };

  useEffect(() => {
    setAddress(useraddress);
    setPhoneNumber(userPhone);
    setZipCode(userZipCode);
    setHouseNo(userHouseNo);
  }, [data]);

  const validateAddress = (address) => {
    if (address.trim().length < 5) {
      console.log("Address is too short. Please provide a valid address.");
      return false;
    }

    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(address)) {
      console.log("Address should only contain letters and spaces.");
      return false;
    }

    return true;
  };

  const HandleUpdateAddress = (e) => {
    e.preventDefault();

    if (!address || !zipCode || !houseno) {
      toast("Please fill in all fields.");
      return;
    }

    if (!validateIndianPhoneNumber(phone)) {
      toast("Invalid phone number");
      return;
    }

    if (!validateAddress(address)) {
      toast("Invalid address. Please enter a valid address.");
      return;
    }
    trigger({ houseno, zipCode, phone, address });
  };

  useEffect(() => {
    if (createAddressData && createAddressData?.success) {
      toast(createAddressData?.message);
    }
    if (isSuccess) {
      closeModal();
      setViewAddress(true);
    }

    if (isError) {
      toast("Something is Wrong !");
    }
  }, [isSuccess, isError, createAddressData]);

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhoneNumber(input);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Profile Modal"
      className="modal bg-black text-gray-400  p-6 mx-1  font-serif rounded-lg w-full max-w-md z-50"
      overlayClassName="overlay fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="mb-5">
        <button onClick={closeModal} className="text-white hover:text-gray-100">
          <div className="bg-gray-600 rounded-full size-6 flex justify-center items-center">
            <CloseIcon fontSize="small" />
          </div>
        </button>
      </div>
      <h2 className="text-md mb-2 mt-2 text-center text-pink-700">
        Edit address
      </h2>

      <form className="space-y-4 w-full" onSubmit={HandleUpdateAddress}>
        <label className="block text-sm">address</label>
        <div>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter address"
            className="w-full p-3 bg-gradient-to-r to-rose-100 via-blue-300 from-rose-500 placeholder-white text-white rounded outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Phone Number</label>
          <input
            value={phone}
            onChange={handlePhoneChange}
            type="text"
            placeholder="Enter phone"
            className="w-full p-3 bg-gradient-to-r to-rose-100 via-blue-300 from-rose-500 placeholder-white text-white rounded outline-none"
          />
        </div>
        <div className="flex gap-x-2 ">
          <div>
            <label className="block text-sm mb-2">Zip Code</label>
            <input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              type="text"
              placeholder="Zip code"
              className="w-full p-3 bg-gradient-to-r to-rose-100 via-blue-300 from-rose-500 placeholder-white text-white rounded outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">House No</label>
            <input
              value={houseno}
              onChange={(e) => setHouseNo(e.target.value)}
              type="text"
              placeholder="House no"
              className="w-full p-3 bg-gradient-to-r to-rose-100 via-blue-300 from-rose-500 placeholder-white text-white rounded outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white font-extralight  
           bg-gradient-to-r to-rose-600 via-blue-900 from-rose-200 w-full p-2  
            rounded-2xl flex justify-center "
        >
          {isLoading ? (
            <div className="size-6 animate-spin border-blue-400 border-t-2 rounded-full flex justify-center items-center ">
              <div className="size-4 border-b-2  border-green-400 rounded-full"></div>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default EditProfileModel;
