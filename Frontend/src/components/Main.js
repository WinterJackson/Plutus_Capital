import { useEffect, useState } from 'react';
import CircleProgressBar from './Circle';
import './Main.css';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';

export default function Main(){
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();
    // const [prevQuestion, setPrevQuestion] = useState({
    //     'qnum': questions.length - 1,
    //     'qstn': questions[questions.length - 1].question
    // })
    var currentQuestion;

    useEffect(()=>{
        fetch('http://127.0.0.1:5555/questions')
        .then((r) => r.json())
        .then(data => {
            setQuestions(data)
        })
        .catch(error => console.log(error))
    },[])

    const handleChoiceSelect = (questionId, choiceScore) => {
        setSelectedAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: choiceScore,
        }));
      };
      const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      };
      const handleBack = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      };
      const handleSubmit = () => {
        const data = {
          'answers': selectedAnswers
        }
        fetch('http://127.0.0.1:5555/submit_ans',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then((r) => {
          if (!r.ok){
            throw new Error('Error occured')
          }
          return r.json();
        })
        .then((data) => {
          console.log(data)
          navigate('/profile');
        })
        .catch((error) => {
          console.error('caught error')
        })
      };
      if (questions.length > 0){
        currentQuestion = questions[currentQuestionIndex];
      }else{
        currentQuestion = null
      }
    return (
        <div className="main_bod">
            <div className="main_left">
                <ProgressBar/>
            </div>
            <div className="main_right">
                <div className="right_top">
                    <div className="backBtn" onClick={currentQuestionIndex === 0 ? ()=>{}: handleBack}>B</div>
                    <CircleProgressBar done={Object.keys(selectedAnswers).length} total={questions.length} />
                </div>
                <div className="typing-text" key={currentQuestion != null ? currentQuestion.id : 0}>
                  <div className='qstnCnt'>
                    <p className='qstnCnt'>{currentQuestion != null ? currentQuestion['question'] : 'No questions available'}</p>
                  </div>
                </div>
                <div className="choice-text">
                {currentQuestion != null ? currentQuestion.choices.map((choice) => (
                    <>
                    <input
                    id={choice.id}
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={choice.score}
                    checked={selectedAnswers[currentQuestion.id] === choice.score}
                    onChange={() => handleChoiceSelect(currentQuestion.id, choice.score)}
                    />
                    <label htmlFor={choice.id} key={choice.id}>
                    {choice.body}
                    </label>
                    </>
                )) : <></>}
                </div>
                <button className='NextButton' onClick={currentQuestionIndex === questions.length-1 ? handleSubmit : handleNext}>
                    {currentQuestionIndex === questions.length-1 ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    )
}