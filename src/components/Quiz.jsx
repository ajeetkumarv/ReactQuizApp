import {useState, useCallback} from 'react';

import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';

export default function Quiz() {
    const [answerState, setAnswerState] = useState(''); // empty means unanswered
    const [userAnswers, setUserAnswers] = useState([]);

    /* Deriving state from existing data */
    const currentActiveQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const handleSelectAnswer = useCallback(
      function handleSelectAnswer(selectedAnswer) {

        setAnswerState('answered');

        setUserAnswers((prevUserAnswers) => {
          return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
          /* Checking the answer right or wrong */
          if (QUESTIONS[currentActiveQuestionIndex].answers[0] === selectedAnswer) {
            setAnswerState('correct');
          } else {
            setAnswerState('wrong');
          }

          setTimeout(() => {setAnswerState('')}, 2000); //reset the answer state

        }, 1000);
      }, [currentActiveQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(currentActiveQuestionIndex === QUESTIONS.length) {
        return quizCompleted();
    }

    return (
      <div id="quiz">
        <Question
          key={currentActiveQuestionIndex}
          index={currentActiveQuestionIndex}
          questionText={QUESTIONS[currentActiveQuestionIndex].text}
          answers={QUESTIONS[currentActiveQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSkipAnswer={handleSkipAnswer}
          onSelectAnswer={handleSelectAnswer}/>
      </div>
    );
}

function quizCompleted() {
  return <div id="summary">
      <img src={quizComplete} alt="quiz complete" />
      <h2>Quiz Completed!</h2>
    </div>;
}