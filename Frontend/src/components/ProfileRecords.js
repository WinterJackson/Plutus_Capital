import { HiArrowLongLeft} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SingleProfileCard from "./reusables/SingleProfileCard";



const ProfileRecords=()=>{
    const navigate=useNavigate()

    return (
    <div className="w-full h-full bg-lightBrownBg font-montserrat overflow-y-scroll">
        <div className=" w-[75%] mx-auto pt-2">

            <div className="flex justify-between">
                <button onClick={()=> navigate(-1)} className="flex items-center transition-colors duration-300 gap-x-2 bg-darkBrownBg hover:bg-hoverBg w-fit py-2 px-3  text-white">
                    <span className="text-xl "><HiArrowLongLeft/></span> 
                    <span className="">Back</span>
                </button>

                {/* <h1 className="capitalize font-semibold text-2xl text-center">Your Survey Profile Records</h1> */}
            </div>
            <h1 className="text-2xl text-darkText font-semibold mb-4 mt-8">Records</h1>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <SingleProfileCard/>
            <SingleProfileCard/>
            <SingleProfileCard/>
            <SingleProfileCard/>

            </section>
        </div>
    </div>
    )
}

export default ProfileRecords