"use client";
import Image from "next/image";
import React from "react";
import NoteSideButton from "./note-side-button";
import { Note } from "@/app/types";
import { signOut } from "@/app/utils/helpers";
import { redirect } from "next/navigation";

export default function Sidebar({
  notes,
  username,
  email,
}: {
  notes: Note[];
  username: string;
  email: string;
}) {
  const handleSignOut = () => {
    signOut();
    redirect("/sign-in");
  };

  return (
    <div className="flex flex-col h-full lg:w-80">
      <div className="flex justify-between w-screen lg:w-80 lg:flex-col lg:space-y-4 lg:min-h-screen lg:border lg:rounded-xl">
        <div className="flex flex-col justify-start p-5">
          <div className="flex items-center space-x-2 p-4 gap-5 lg:pb-10 w-full">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <h1 className="text-xl lg:text-2xl">Dashboard</h1>
          </div>
          <div className="hidden lg:flex flex-col gap-10">
            <button className="lg:block hidden px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full transition-all ease-in-out duration-200">
              Create Note
            </button>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Recent Notes</h2>

              {notes.map((note) => (
                <NoteSideButton key={note.id} note={note} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-4">
          <button
            onClick={handleSignOut}
            className="md:px-4 px-2 py-2 text-sm lg:text-lg text-blue-600 font-semibold underline bg-transparent rounded-md hover:bg-gray-200 transition-all ease-in-out duration-200 lg:w-full lg:bg-blue-600 lg:text-white lg:no-underline lg:hover:bg-blue-800"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex flex-col w-auto lg:w-80 lg:flex-col lg:space-y-4 shadow-lg px-5 py-10 m-5 gap-4 border rounded-xl lg:hidden">
        <h2 className="lg:text-2xl font-semibold text-xl">
          Welcome, {username} !
        </h2>
        <h3 className="lg:text-lg text-gray-500 text-lg ">Email:{email}</h3>
      </div>
      <div className="flex flex-col p-5 gap-5 lg:hidden">
        <button className="px-4 py-4 mx-auto text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full transition-all ease-in-out duration-200 ">
          Create Note
        </button>
      </div>
      <div className="flex flex-col p-5 gap-5 lg:hidden">
        <h2 className="text-xl font-semibold">Notes</h2>
        {notes.map((note) => (
          <NoteSideButton key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
