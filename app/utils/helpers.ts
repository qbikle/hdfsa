"use server";
import jwt from "jsonwebtoken";

export const sendOTP = async (email: string) => {
  const res = await fetch("http://localhost:3000/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true };
  } else {
    return { success: false, error: data.error };
  }
};

export const verifyOTP = async (
  formData: { email: string; otp: string; name: string },
  dob: Date
) => {
  const res = await fetch("http://localhost:3000/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, dob: dob.toString() }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true, user: data.user };
  } else {
    return { success: false, error: data.error };
  }
};

export const generateJWT = async (userId: string, email: string) => {
  const payload = {
    id: userId, // User ID
    email: email, // User Email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return token;
};
