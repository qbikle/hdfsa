"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
  });

  const [dob, setDob] = useState<Date>();

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
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500  duration-300 transform-translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Your Name
        </label>
      </div>

      {/* <div className="relative">
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="dob"
          className="absolute text-sm text-gray-500  duration-300 transform-translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Date of Birth
        </label>
      </div> */}

      {/* DOB Field */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-gray-300 h-11",
              !dob && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dob ? format(dob, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dob}
            onSelect={setDob}
            initialFocus
          />
        </PopoverContent>
      </Popover>

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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Sign up
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
        Continue with Google

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
