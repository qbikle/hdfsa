import { Note } from '@/app/types'
import { Trash2 } from 'lucide-react'
import React from 'react'

export default function NoteSideButton({note}: {note: Note}) {
  return (
    <div className='flex w-full shadow-xl rounded-xl' >
      <button className="w-full flex  justify-start items-center border-t border-l border-b rounded-l-xl p-5 hover:bg-gray-200 transition-all ease-in-out duration-200">
        {note.title}
        
      </button>
      <button className='border-t border-r border-b p-8 text-grey-500 rounded-r-xl hover:bg-gray-200 transition-all ease-in-out duration-200 group'>
        <Trash2 className="opacity-50 group-hover:opacity-100 transition-all ease-in-out duration-200" />
      </button>
    </div>
  )
}
