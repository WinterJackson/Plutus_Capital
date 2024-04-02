import React, { useState } from 'react';
import './ProgressBar.css';

const questions = [
  'What is your name?',
  'Where do you live?',
  'What is your favorite color?',
  'What is your favorite food?',
  'What is your hobby?',
  // Add more questions here
];

const ProgressBar = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="progress-bar">
      <div className="progress-circle previous">
        <span className="question-number">
          {currentQuestion > 0 ? currentQuestion : questions.length}
        </span>
        <div className="question-text">
          {currentQuestion > 0 && questions[currentQuestion - 1]}
        </div>
      </div>
      <div className="progress-circle current">
        <span className="question-number">{currentQuestion + 1}</span>
        <div className="question-text">{questions[currentQuestion]}</div>
      </div>
      <div className="progress-circle next">
        <span className="question-number">
          {currentQuestion < questions.length - 1 ? currentQuestion + 2 : 1}
        </span>
        <div className="question-text">
          {currentQuestion < questions.length - 1 && questions[currentQuestion + 1]}
        </div>
      </div>
      <div className="progress-buttons">
        <button onClick={prevQuestion}>Previous</button>
        <button onClick={nextQuestion}>Next</button>
      </div>
    </div>
  );
};

export default ProgressBar;



