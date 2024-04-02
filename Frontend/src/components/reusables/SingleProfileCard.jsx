import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { HiCalendarDays, HiMiniScale } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const SingleProfileCard = () => {
    const navigate=useNavigate()

  return (
    <div onClick={()=> navigate('/profile/1')} className=" bg-slightWhiteBg font-montserrat p-4 rounded-lg shadow-[0px_0px_10px_rgba(74,53,33,.3)] transition-all duration-400 cursor-pointer">
        <p className="flex items-center mb-2 text-lg text-darkText uppercase">
            <span className="mr-2  font-semibold ">Moderate</span>
            <span><HiMiniScale/></span>
        </p>
        <p className='text-darkText'>
            <span><HiCalendarDays/></span>
            <span className="mr-2 font-medium ">Date completed:</span>
            <span className='block '>24 Nov 2023 1900 hrs</span>
        </p>
        <p className="my-1 flex gap-x-2 text-blue-500">
            <span className="font-medium  ">score:</span>
            <span>70</span>
        </p>
        <button onClick={()=> navigate('/profile/1')} className="py-1 px-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white shadow-[2px_2px_4px_rgba(255,255,255,0.2)] font-medium flex items-center rounded-lg">
            <span>View</span>
            <span className="text-lg ml-1"><AiOutlineEye/></span>
        </button>
    </div>
  )
}

export default SingleProfileCard