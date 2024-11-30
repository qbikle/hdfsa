import Sidebar from "@/components/ui/sidebar";
import { getAllUserNotes, getServerSession } from "../utils/helpers";
import { redirect } from "next/navigation";
import { session } from "../types";
import { Suspense } from "react";
import { LoaderPinwheel } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession() as session;

  const notes = await getAllUserNotes(session.user?.id ?? "");

  if (!session.session && !session.user) {
    redirect("/sign-in");
  }

  const username = session.user?.name;
  const email = session.user?.email;

  return (
    <div className="min-h-screen flex w-screen lg:flex">
      <Sidebar session={session} notes={notes} username={username ?? ""} email={email ?? ""} />
      <div className="w-full hidden lg:block">
        <h1 className="text-4xl text-center mt-10">Welcome, {username}!</h1>
        <h2 className="text-3xl ml-10 mt-10">Your Notes</h2>
        <div className="flex flex-col items-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-h-[75vh] p-5">
              <Suspense fallback={<LoaderPinwheel/>}>
                {/* load website and display notes after loading */
                notes.map((note) => (
                  <div key={note.id} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{note.title}</h3>
                    <p className="text-gray-500">{note.content}</p>
                  </div>
                ))
                }
              </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
