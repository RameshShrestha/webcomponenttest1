import React, { useState,useEffect } from 'react';
//import questions from '../../Data/Questions';
import {getDumpQuestions}   from "../api/QuizApi";
function Quiz() {
  const [questionSet, setQuestionSet] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
     let response = await getDumpQuestions();
     if(response.dumpQuestions){
      setQuestionSet(response.dumpQuestions);
     }
     console.log(response);
    };
     fetchData();
  
}, []);
  const handleCheckboxChange = (oEvent) => {
    console.log(oEvent);
    let selected = oEvent.currentTarget.checked;
    console.log(currentQuestion);
    console.log(questionSet[currentQuestion]);
    const deepCopy = JSON.parse(JSON.stringify(questionSet[currentQuestion]));
    deepCopy.answerOptions[oEvent.currentTarget.id].selected = oEvent.currentTarget.checked;
    let selectedOptions = "";
  for (let iCount=0;iCount < deepCopy.answerOptions.length;iCount++){
    if(deepCopy.answerOptions[iCount].selected){
      selectedOptions=selectedOptions  + deepCopy.answerOptions[iCount].answerIndex + ",";
    }
  }
    deepCopy.selectedAnswer = selectedOptions;//oEvent.currentTarget.id;

    let newQuestionSet = questionSet.map(question => {
      if (question.questionId === deepCopy.questionId) {
        return deepCopy;
      } else {
        return question;
      }
    });
    setQuestionSet(newQuestionSet);

  };
  const handleRadioButtonChange = (oEvent) => {
    console.log(oEvent);
    const deepCopy = JSON.parse(JSON.stringify(questionSet[currentQuestion]));
    deepCopy.answerOptions.map(answerOption => answerOption.selected = false);

    deepCopy.answerOptions[oEvent.currentTarget.id].selected = oEvent.currentTarget.checked;
    deepCopy.selectedAnswer = oEvent.currentTarget.id;
    let newQuestionSet = questionSet.map(question => {
      if (question.questionId === deepCopy.questionId) {
        return deepCopy;
      } else {
        return question;
      }
    });
    setQuestionSet(newQuestionSet);
  };
  const handleAnswerOptionClick = (isCorrect) => {
    // if (isCorrect) {
    //   setScore(score + 1);

    // }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionSet.length) {
      setCurrentQuestion(nextQuestion);
    }
  };
  const handlePreviousClick = () => {
    let previousQuestion = currentQuestion - 1;
    if (previousQuestion < 0) {
      previousQuestion = 0;
    }
    setCurrentQuestion(previousQuestion);

  }

  return (
    <>
    <div className='quiz-app'>
      {questionSet.length < 1 ? (
        <div className='score-section'>
         Loading Data
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questionSet.length}
            </div>
            <div className='question-text'>{questionSet[currentQuestion].questionText}</div>
          </div>
          {/* <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                {answerOption.answerText}
              </button>
            ))}
          </div> */}
          <div>
            <h4>{questionSet[currentQuestion].questionType === "MultiSelect" ? `Select ${questionSet[currentQuestion].correctAnswersCount} answers` : "Select correct Option"}</h4>
            {questionSet[currentQuestion].answerOptions.map((option, index) => (

              <div key={option.answerIndex}>
                {questionSet[currentQuestion].questionType === "MultiSelect" ?
                  <input
                  style={{height: "1.2rem",width:"1.2rem"}}
                    type="checkbox"
                    id={option.answerIndex}
                    value={option.answerIndex}
                    checked={option.selected}
                    onChange={handleCheckboxChange}
                  /> :
                  <input
                  style={{height: "1.2rem",width:"1.2rem"}}
                    type="radio"
                    name={questionSet[currentQuestion].questionId}
                    id={option.answerIndex}
                    value={option.answerIndex}
                    checked={option.selected}
                    onChange={handleRadioButtonChange}
                  />}
                <label htmlFor={option.answerIndex} style={{fontSize: "1.5rem",fontFamily: "Arial, sans-serif"}}>{option.answerText}</label>
              </div>

            ))}
            <p>Selected: {questionSet[currentQuestion].selectedAnswer}</p>
          </div>
        </>
      )}
      
    </div>
    <div className='footerbar'>
    <button className='welcomeNavButton' onClick={handlePreviousClick}>Previous</button>
    <button className='welcomeNavButton' onClick={handleAnswerOptionClick}>Next</button>
    <button className='welcomeNavButton'>Navigator</button>
    <button className='welcomeNavButton'>Submit</button>
  </div></>
  );
}

export default Quiz;