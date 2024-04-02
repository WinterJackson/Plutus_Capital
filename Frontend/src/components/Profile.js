import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar from "./NavBar"
// import {HiOutlineScale, HiOutlineUser} from 'react-icons/hi'
// import { BsFillClipboardCheckFill } from "react-icons/bs";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import {BsCalendarEvent} from 'react-icons/bs'
// import {GoGoal} from 'react-icons/go'
// import picture from "../assets/congrats2.png"
// import business from "../assets/business3.jpeg"
// import SurveyLineGraph from './SurveyLineGraph';
// import { surveyPerformance } from './Data';
import useLocalStorage from '../customHooks/useLocalStorage'
import businessbg from '../assets/businessbg.jpg'
import vectorCartoonLady from '../assets/lady.png'
import vectorCartoonLad from '../assets/lad.png'
import './Profile.css'; 

function Profile() {
  // const themstyles={
  //   // backgroundColor:"red",
  //   background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${business})`,
  //   // backgroundImage:`url(${business})`,
  //   backgroundAttachment:"scroll",
  //   backgroundSize:"cover",
  //   backgroundPosition:"center center"

  // }

  const navigate=useNavigate()

  // const chartData = {
  //           labels: surveyPerformance.map((each)=> each.name),
  //           datasets: [
  //             {
  //               label: 'Survey Results Trend',
  //               data: surveyPerformance.map((each)=> each.result),
  //               backgroundColor: 'green', // Bar color
  //               borderColor: 'black', // Border color
  //               borderWidth: 1,
  //             },
  //           ], 
  //         };

  useEffect(()=>{
     const the_answers_object=JSON.parse(localStorage.getItem("answers"))

     const firstSixScores=Object.values(the_answers_object).slice(0,6);

    //  const totalQuestions=Object.values(the_answers_object).length;
    //  setQuestionCount(totalQuestions)

     const total_marks=(firstSixScores.reduce((acc,value)=>acc+value,0))-36
    //  setUserScore(total_marks)

     if (total_marks>=6 && total_marks<=15 ){
      setProfileType("Conservative")
     }
     else if (total_marks>=16 && total_marks<=25 ){
      setProfileType("Moderately conservative")
     }
     else if (total_marks>=26 && total_marks<=34 ){
      setProfileType("Moderate")
     }
     else if (total_marks>=35 && total_marks<=44 ){
      setProfileType("Moderately aggressive")
     }
     else if (total_marks>=45 && total_marks<=54 ){
      setProfileType("Aggressive")
     }
    //  console.log(total_marks)

    //  localStorage.setItem("time", JSON.stringify(new Date().toLocaleTimeString()))

  },[])
  // const currentTime=useRef(new Date());


  const [profileType, setProfileType]=useLocalStorage("profileType","None")
  // const [userScore,setUserScore]=useLocalStorage("userScore",0)
  // const [questionCount,setQuestionCount]=useLocalStorage("questionsCount",0)

  // console.log(total_marks)

  const gender="female"

 return (
  <div className="font-montserrat overflow-y-scroll">
    <NavBar />
    <div className="w-full h-screen q-wrap">
    <div className="w-[89%] mx-auto">
      <div className="px-4 pt-1">
        <section className="relative lg:w-[90%] mx-auto  h-[29rem] bg-slightWhiteBg shadow-[2px_2px_10px_rgba(0,0,0,0.3)]">
          <img className='w-full h-full' src={businessbg} alt="background" />

          <img className={`${gender==="female"?"":"hidden"} absolute right-16 top-[8.2rem] md:top-4 w-[14rem] md:w-[19rem] h-[20rem] md:h-[25rem]`} src={vectorCartoonLady} alt="vector cartoon lady " />
          <img className={`${gender==="female"?"hidden":""} absolute right-16 top-[8.2rem] md:top-4 w-[14rem] md:w-[19rem] h-[20rem] md:h-[25rem]`} src={vectorCartoonLad} alt="vector cartoon lad" />

          <p className="absolute left-2 md:left-16 top-8 bg-darkBrownBg text-white px-4 py-1 md:py-3 text-sm md:text-lg rounded-[1.8rem]"> Hello! You are ranked <span className="font-semibold text-lightText">{profileType}</span></p>

          <div className="absolute left-2 md:left-16 top-[4rem] md:top-[6rem] ">

            <p className=" relative z-10 w-[17rem] md:w-[32rem] mt-1 bg-darkBrownBg text-white px-4 py-1 md:py-4 text-sm md:text-lg rounded-[1.8rem]">
              <p className="relative z-10">
                <span className="font-semibold">{profileType}</span> Profile signifies a well-balanced and prudent approach to business, 
                savings, and investments.
              </p>
              
              <p className='absolute -right-1 top-[50%] -translate-y-[50%] bg-darkBrownBg h-[2rem] md:h-[2.5rem] lg:h-[4rem] w-[2rem] md:w-[2.5rem] lg:w-[4rem] rotate-[45deg]'></p>
            </p>

            <p className="relative mt-2 bg-darkBrownBg text-white px-3 md:px-4 py-1 md:py-3 text-sm md:text-lg rounded-[1.8rem]">
              <p className="relative z-10">
                Click <span onClick={()=> navigate('/profile/1')} className="underline font-medium hover:text-lightText cursor-pointer">here</span> to view a detailed report
              </p>
              

              <p className='absolute right-0 md:-right-1 top-[50%] -translate-y-[50%] bg-darkBrownBg h-[0.5rem] md:h-[1.2rem] w-[0.5rem] md:w-[1.2rem] rotate-[45deg]'></p>
            </p>

          </div>
        </section>

      </div>
    </div> 
  </div>
  </div>

  );
}

export default Profile;