import React, { useEffect, useState } from "react";
import logoLogo from "../assets/mobile-login-concept-illustration_114360-135.avif";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../rtkQuery/userAuthservice";
import { useSelector } from "react-redux";

const Register = () => {
  const focus = useSelector((state) => state?.searchreducer?.focus);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [register, { data, isError, isLoading, error, isSuccess }] =
    useRegisterMutation();
  const [togglePassword, setTogglePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData?.username) {
      toast.warn("Please fill in your username!");
      return;
    }

    if (!formData?.email) {
      toast.warn("Please fill in your email!");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|io)$/;
    if (!emailRegex.test(formData?.email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (!formData?.password) {
      toast.warn("Please fill in your password!");
      return;
    }

    if (formData?.password.length < 6) {
      toast.warn("Password must be at least 6 characters long!");
      return;
    }

    register(formData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }

    if (isSuccess) {
      toast.success(data?.message || "Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  }, [isError, isSuccess, error, data]);
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
        <h2 className="text-center text-rose-600 text-lg mb-6 font-serif">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="w-full px-4 py-2 border border-gray-200 rounded-tl-xl shadow-2xl shadow-green-500"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border outline-none border-gray-200 rounded-tl-xl"
            />
          </div>

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
              type={togglePassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 outline-none border rounded-tl-xl"
            />
            {togglePassword ? (
              <VisibilityIcon
                className="absolute right-4 top-8 cursor-pointer text-green-900"
                onClick={() => setTogglePassword(false)}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => setTogglePassword(true)}
                className="absolute right-4 top-8 cursor-pointer text-green-900"
              />
            )}
          </div>

          {isLoading ? (
            <div className="w-full bg-rose-600 text-white py-2 flex justify-center items-center gap-x-2 rounded-md hover:bg-blue-600 outline-none cursor-pointer focus:scale-105 transition-all duration-500">
              <button type="submit" disabled>
                Processing...
              </button>
              <div className="size-4 animate-spin rounded-full border-2 border-t-green-400"></div>
            </div>
          ) : (
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-rose-600 text-white py-2 cursor-pointer rounded-md hover:bg-blue-600 outline-none transition-all duration-500"
              >
                Register
              </button>
            </div>
          )}
        </form>

        <div className="mt-3">
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
