import React, { useState, useEffect } from 'react';
import { HiArrowLongLeft, HiMiniScale } from 'react-icons/hi2';
// import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import AttemptBarChart from './AttemptBarChart';
import useLocalStorage from '../customHooks/useLocalStorage';
import { TestingQuestions } from './Data';
import { useNavigate } from 'react-router-dom';
import './ProfileDetails.css';

// const ContainerDiv = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
// });

const ProfileDetails = () => {
  // const [firstSix, setFirstSix] = useLocalStorage('userScore', []);
  // questionsResults
  const [modalVisibility, setModalVisibilty] = useState(false)
  const handleModalVisibility = ()=>{
    setModalVisibilty(!modalVisibility)
  }
  const questionsResults = {
    labels: TestingQuestions.slice(0, 6).map((each) => each.question),
    datasets: [
      {
        label: 'Question Performance Summary',
        data: Object.values(JSON.parse(localStorage.getItem('answers'))).slice(0, 6),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const [profileType, setProfileType] = useLocalStorage('profileType', 'None');
  // const [questionCount, setQuestionCount] = useLocalStorage('questionsCount', 0);
  // const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [receiverEmail, setReceiverEmail] = useState('')

  const currentTime = JSON.parse(localStorage.getItem('time'));

  const handleReceiverEmail = (event)=>{
    setReceiverEmail(event.target.value);
  }

  const handleSendEmail = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('profileChart'), { scale: 2 });
      const imageDataURL = canvas.toDataURL('image/png');
      // console.log('Email being submitted:', email);
      // console.log('Image code being submitted for decoding:', imageDataURL);
      setModalVisibilty(false)
  
      const response = await axios.post('http://127.0.0.1:5555/send-email', {
        email: receiverEmail,
        imageAttachment: imageDataURL,
        profiletype: profileType,
      });

      Swal.fire({
        icon: 'success',
        title: 'Email Sent!',
        text: response.data.message,
      });
      setReceiverEmail('')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response ? error.response.data.error : 'An error occurred',
      });
      setReceiverEmail('')
    }
  };

  useEffect(() => {
    const the_answers_object = JSON.parse(localStorage.getItem('answers'));
    const firstSixScores = Object.values(the_answers_object);
    // setFirstSix(firstSixScores);

    const total_marks = firstSixScores.reduce((acc, value) => acc + value, 0);

    if (total_marks >= 6 && total_marks <= 15) {
      setProfileType('Conservative');
    } else if (total_marks >= 16 && total_marks <= 25) {
      setProfileType('Moderately conservative');
    } else if (total_marks >= 26 && total_marks <= 34) {
      setProfileType('Moderate');
    } else if (total_marks>= 35 && total_marks <= 44) {
      setProfileType('Moderately aggressive');
    } else if (total_marks >= 45 && total_marks <= 54) {
      setProfileType('Aggressive');
    } else if (total_marks >= 55 && total_marks <= 200) {
      setProfileType('Hilarious');
    }
  }, []);

  return (
    <div id="profile-details" className="profile-details-wrap">
      <div className={modalVisibility ?  "overlayWrap" : 'modalHidden'}>
            <div className="emailModal">
                <div className="mailImage">
                    <img src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-13619.jpg"
                    alt="email icon"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </div>
                <div className="closeBtn" onClick={handleModalVisibility}>X</div>
                <div className="summary">
                    <p>Please provide your email address so that we can send you the results of your investment profile.</p>
                </div>
                <input type="email" name="reciverEmail" id="reciverEmail" value={receiverEmail} onChange={handleReceiverEmail} placeholder='Example@email.com'/>
                <button className="submitEmail" onClick={handleSendEmail}>Submit Email</button>
            </div>
        </div>
      <div className="w-[85%] mx-auto py-4 bg-lightBrownBg px-4 pt-1" style={{ marginTop: '5rem', borderRadius: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-2 mb-2 bg-darkBrownBg hover:bg-hoverBg transition-colors duration-300 w-fit py-2 px-3  text-white"
        >
          <span className="text-xl ">
            <HiArrowLongLeft />
          </span>
          <span className="">Back</span>
        </button>

        <p className="flex items-center mb-2 text-2xl text-darkText ">
          <span className="mr-2 font-semibold">{profileType}</span>
          <span>
            <HiMiniScale />
          </span>
        </p>

        <p className="">
          Profile generated on <span className="font-semibold mb-10">{currentTime}</span>
        </p>
        <button onClick={handleModalVisibility}>Mail Results</button>

        <h1 className="text-xl text-darkText font-semibold mb-2 mt-14">Question Performance Summary</h1>

        <div id='profileChart'>
          <AttemptBarChart questionData={questionsResults} />
        </div>

      </div>
    </div>
  );
};

export default ProfileDetails;
