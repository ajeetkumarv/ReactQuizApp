import {useState, useCallback} from 'react';

import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    /* Deriving state from existing data */
    const currentActiveQuestionIndex = userAnswers.length;

    const handleSelectAnswer = useCallback(
      function handleSelectAnswer(selectedAnswer) {


        setUserAnswers((prevUserAnswers) => {
          return [...prevUserAnswers, selectedAnswer];
        });
      }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(currentActiveQuestionIndex === QUESTIONS.length) {
        return quizCompleted();
    }

    return (
      <div id="quiz">
        <Question
          key={currentActiveQuestionIndex}
          index={currentActiveQuestionIndex}
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