"use server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
    const token = await generateJWT(data.user.id, data.user.email);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: "strict",
    });
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

export const verifySignIn = async (email: string, otp: string) => {
  const res = await fetch("http://localhost:3000/api/verify-signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();
  if (res.ok) {
    const token = await generateJWT(data.user.id, data.user.email);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: "strict",
    });
    return { success: true, user: data.user };
  } else {
    return { success: false, error: data.error };
  }
};

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });
};

export const getServerSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { user: null , session : false};
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return { user: null , session : false};
    }
    return { user: user , session : true};
  } catch (error) {
    return { user: null , session : false};
  }
};
