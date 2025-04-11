import React, { useEffect, useState } from "react";
import logoLogo from "../assets/mobile-login-concept-illustration_114360-135.avif";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLoginMutation } from "../rtkQuery/userAuthservice";
const Login = () => {
  const focus = useSelector((state) => state?.searchreducer?.focus);
  const [TogglePassword, settogglePassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginFun, { data, isError, error, isLoading, isSuccess }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Login successful!");
      setFormData({
        email: "",
        password: "",
      });
      navigate("/", { replace: true });
    }
  }, [isSuccess, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.email && !formData?.password) {
      toast("All fields are required!");
      return;
    }
    if (!formData?.email) {
      toast.warn("Fill your Email!");
      return;
    }
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|io)$/;
    if (!emailRegex.test(formData?.email)) {
      toast("Invalid email!");
      return;
    }
    if (!formData?.password) {
      toast.warn("Fill Your Password!");
      return;
    }
    await loginFun(formData);
  };

  if (focus) return;
  return (
    <div className="flex justify-center items-center min-h-screen font-serif text-sm md:text-md text-gray-400">
      <div className="hidden lg:block lg:w-1/2 p-6">
        <img
          src={logoLogo}
          alt="Illustration"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="mb-48 w-full sm:w-96 lg:w-1/3 z-10 mx-4">
        <h2 className="text-center text-rose-500 text-lg mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-tl-xl shadow-2xl shadow-green-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border outline-none border-slate-300 rounded-tl-xl"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-tl-xl shadow-2xl shadow-rose-500"
            >
              Password
            </label>
            <input
              type={TogglePassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 outline-none border rounded-tl-xl "
            />
            {TogglePassword ? (
              <VisibilityIcon
                className="absolute right-4 top-8 text-green-900"
                onClick={() => settogglePassword(false)}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => settogglePassword(true)}
                className="absolute right-4 top-8 text-green-900"
              />
            )}
          </div>
          <Link
            to="forgot-password"
            className="flex justify-end hover:underline cursor-pointer"
          >
            <p>Forgot Password</p>
          </Link>

          <div
            className="bg-rose-800 p-2 active:scale-110
           hover:bg-rose-700 cursor-pointer rounded-xl flex justify-center items-center gap-3"
          >
            <button type="submit" className="text-white w-full">
              Login
            </button>
            {isLoading && (
              <div className="border-2 border-t-teal-300 size-4 animate-spin rounded-full"></div>
            )}
          </div>
        </form>
        <div className="mt-3">
          <p className="text-center ">
            I'm not registered?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
