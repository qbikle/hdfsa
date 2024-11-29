"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add logic to send data to the server
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-500  duration-300 transform-translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Email
        </label>
      </div>

      {/* OTP Field */}
      <div className="relative">
        <div className="relative">
          <input
            type="password"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="otp"
            className="absolute text-sm text-gray-500  duration-300 transform-translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            OTP
          </label>
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
          >
            🔒
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <div>
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Keep me logged in Checkbox */}
      <div className="flex items-center justify-between">
        <label htmlFor="remember" className="text-sm text-gray-800">
          <input type="checkbox" id="remember" className="mr-2" />
          Keep me logged in
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Sign in
      </button>

      {/* Divider */}
      <div className="flex items-center justify-center space-x-2">
        <hr className="w-1/2 border-gray-300" />
        <span className="text-gray-500">or</span>
        <hr className="w-1/2 border-gray-300" />
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        className="flex items-center font-semibold justify-center w-full px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
      >
        Sign in with Google
        <Image
          src="/google.svg"
          alt="Google"
          className="w-5 h-5 ml-2"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
}
