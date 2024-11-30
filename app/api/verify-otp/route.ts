import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateJWT } from "@/app/utils/helpers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, otp, name, dob } = await req.json();

  const date = new Date(dob);

  if (!email || !otp || !name || !dob) {
    return NextResponse.json(
      { error: "Email, OTP, name, and DOB are required" },
      { status: 400 }
    );
  }

  // Validate OTP
  const otpRecord = await prisma.oTP.findFirst({
    where: { email, otp },
  });

  if (!otpRecord) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  if (otpRecord.expiresAt < new Date()) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  // Create the user if OTP is valid
  const user = await prisma.user.create({
    data: {
      email,
      name,
      dob: date,
    },
  });

  const token = await generateJWT(user.id, email);

  // Clean up OTP record
  await prisma.oTP.delete({ where: { id: otpRecord.id } });

  await prisma.oTP.deleteMany({
    where: { email },
  });

  const response = NextResponse.json({ message: "Signup successful", user });
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, //-) 7 days
  });
  return response;
}
