import { Note } from "@/app/types";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import NoteModal from "./note-modal";

export default function NoteSideButton({ note }: { note: Note }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const openModal = (note: Note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
    window.location.reload();
  };

  return (
    <div className="flex w-full shadow-xl rounded-xl">
      <button
        onClick={() => openModal(note)}
        className="w-full flex justify-start items-center border-t border-l border-b rounded-l-xl px-5 py-3 hover:bg-gray-200 transition-all ease-in-out duration-200"
      >
        {note.title}
      </button>
      <button className="border-t border-r border-b px-8 py-4 text-grey-500 rounded-r-xl hover:bg-gray-200 transition-all ease-in-out duration-200 group">
        <Trash2 className="opacity-50 group-hover:opacity-100 transition-all ease-in-out duration-200" />
      </button>
      {currentNote && isModalOpen && (
        <NoteModal
          note={currentNote}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
