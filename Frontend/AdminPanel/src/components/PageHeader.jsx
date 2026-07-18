import { Plus, PlusCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function PageHeader({title = 'Title' , path = "" , btnTitle="title" }) {
  return (
    <div>
         <div className="w-full border-l-4 border-l-black mb-6 rounded-lg shadow-md bg-white p-3  transition duration-300">
        <div className="flex items-center justify-between bg-gray-50 p-1 border border-gray-200 rounded-md">
          <h2 className="text-xl animate-bounce px-4 font-semibold">!! {title} !!</h2>
         {path && 
         <Link to={path} className='mx-3 text-black/90 px-1 cursor-pointer flex justify-center items-center gap-1 border py-0.5 border-gray-700 rounded-sm'>
          <Plus size={20}/> {btnTitle} 
          </Link>
         } 
        </div>
      </div>
    </div>
  )
}

export default PageHeader