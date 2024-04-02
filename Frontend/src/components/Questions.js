import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Questions.css";
import { getAccessTokenFromCookie } from "./CookieUtils.js";
import graph1 from "../assets/graph1.png";
import graph2 from "../assets/graph2.png";
import NavBar from "./NavBar"
import useLocalStorage from '../customHooks/useLocalStorage'
import Confetti from 'react-confetti';
import GenderSelector from "./GenderSelector.js";


function Questions({setProfile}) {
  const [questions, setQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useLocalStorage("answers", {});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const quizWrapRef = useRef(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [caricature, setCaricature] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:5555/questions", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessTokenFromCookie()}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const [questionNumber, setQuestionNumber] = useState(1);

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1); // Increment question number
      setCurrentChoice(null); // Reset the currently selected choice
    }
  };

  const handleChoiceSelect = (questionId, choiceScore, choiceId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setQuestionNumber((questionNumber) => questionNumber - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setAnswers({});
    setShowResults(false);
    setQuestionNumber(1);
  };

  // const handleProfileSubmission = ()=>{
  //   const data = {'answers': }
  //   fetch('http://127.0.0.1:5555/submit_ans', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({})
  //   })
  // }

  const handleAnswer = (questionId, choiceId, choiceScore) => {
    setAnswers({ ...answers, [questionId]: choiceId });
    setCurrentChoice(choiceId);
    handleChoiceSelect(questionId, choiceScore, choiceId);

    if (activeStep < questions.length - 1) {
      handleNext();
    } else {
      setShowConfetti(true);
      setShowResults(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }
  };

  const navigateToResults = () => {
    navigate("/profile");
    console.log(selectedAnswers)
    localStorage.setItem("time", JSON.stringify(new Date().toLocaleTimeString()))
  };

  const maxSteps = questions.length;

  const alphabet = 'ABCDEFG';

  // const handleChoiceClick = (questionId, choiceId, choiceScore) => {
  //   handleAnswer(questionId, choiceId, choiceScore);
  // };

  const femaleUrl = "https://img.freepik.com/premium-vector/vector-illustration-smiling-business-woman-black-formal-wear-standing-arms-folded_830469-2595.jpg"
  const maleUrl = "https://static.vecteezy.com/system/resources/previews/006/211/538/original/black-businessman-with-briefcase-free-vector.jpg"

  const handleGender = ( data ) => {
    if (data === 'Female') {
      setCaricature(femaleUrl);
    }
    else if (data === 'Male') {
      setCaricature(maleUrl);
    }
  }

  return (
    <>
      <NavBar />
      <GenderSelector handleGender = {handleGender}/>
      <div className="q-wrap">
        <div ref={quizWrapRef} className="quiz-wrap" style={{ display: "block" }}>
          <Box className="custom-box" sx={{ maxWidth: 1280, margin: "0 auto", flexGrow: 1 }}>
            {showResults ? (
              <div className="results-div">
                <Typography variant="h5" className="results-h5">"Awesome job! 🎉 Click below to check your survey results and delve into your profile! 🚀"</Typography>
                <div className="btn-wrap">
                  <Button className="restart-btn" variant="outlined" onClick={handleReset}>
                    Restart
                  </Button>
                  <Button className="results-btn" variant="contained" onClick={navigateToResults}>
                    Results
                  </Button>
                </div>
              </div>
            ) : (
              <Box sx={{ maxWidth: 1280, margin: "0 auto", flexGrow: 1 }}>
                <Paper
                  className="question-div"
                  square
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4em 0",
                    height: 50,
                    pl: 1,
                    bgcolor: "background.default",
                  }}
                >
                  {questions[activeStep] && (
                    <Typography className="question-text" sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      <span style={{ color: "orange" }}>Question {questionNumber}:</span> {questions[activeStep].question}
                    </Typography>
                  )}
                </Paper>
                <div className="middle">
                  <div className="choices-wrap">
                  {questions[activeStep] && (
                    questions[activeStep].id === 14 ? (
                      // Display a scale for question 14
                      <div>
                      <p><strong>Conservative ------------{">"} Aggressive</strong></p>
                      <div className="button-array">
                      {Array.from({ length: questions[activeStep].choices.length }, (_, index) => (
                        <button
                          key={questions[activeStep].choices[index].id}
                          variant="outlined"
                          onClick={() => handleAnswer(questions[activeStep].id, index + 1)}
                          sx={{ width: "20%", padding: "1em"}}
                          className={`choiceL ${currentChoice === index + 1 ? "selected" : ""}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      </div></div>
                    ) : (
                      // Display regular choices for other questions
                      questions[activeStep].choices.map((choice, index) => (
                        <Button
                          key={choice.id}
                          variant="outlined"
                          onClick={() => handleAnswer(questions[activeStep].id, choice.id)}
                          sx={{ width: "100%", padding: "1em" }}
                          className={`choiceList ${currentChoice === choice.id ? "selected" : ""}`}
                        >
                          {alphabet[index]}. {choice.body}
                        </Button>
                      ))
                    )
                  )}
                  </div>
                  <div className="graph-div">
                    {questions[activeStep] && questions[activeStep].id === 5 ? (
                      <div className="image-wrap">
                        <img src={graph1} alt="Graph" />
                      </div>
                    ) : null}
                    {questions[activeStep] && questions[activeStep].id === 6 ? (
                      <div className="image-wrap">
                        <img src={graph2} alt="Graph" />
                      </div>
                    ) : null}
                    {questions[activeStep] && questions[activeStep].id !== 6 && questions[activeStep].id !== 5 ? (
                      <div className="image-wrap2">
                        <img src={caricature} alt="Caricature" style={{ "height": "100%" }} />
                      </div>
                    ) : null}
                  </div>
                </div>
                <MobileStepper
                  className="custom-stepper"
                  variant="text"
                  sx={{ width: "100%", textAlign: "center", padding: "5em" }}
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  // nextButton={
                  //   <Button
                  //     size="small"
                  //     onClick={handleNext}
                  //     disabled={activeStep === maxSteps - 1 || currentChoice === null}
                  //     className="nextButton"
                  //   >
                  //     Next
                  //     {theme.direction === "rtl" ? (
                  //       <KeyboardArrowLeft />
                  //     ) : (
                  //       <KeyboardArrowRight />
                  //     )}
                  //   </Button>
                  // }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      className="backButton"
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Box>
            )}
            {showConfetti && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={300}
                recycle={false}
                confettiSource={{ x: window.innerWidth / 2, y: window.innerHeight / 6 }}
                initialVelocityX={5}
                initialVelocityY={13}
              />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Questions;
