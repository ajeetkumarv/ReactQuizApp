import {useState, useCallback} from 'react';

import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from '../questions.js';

export default function Quick() {
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

    const shuffledAnswers = [...QUESTIONS[currentActiveQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);

    return (
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            timeout={10000}
            onTimeout={handleSkipAnswer}
            key={currentActiveQuestionIndex} // to force remounting timer when question changes
          />
          <h2>{QUESTIONS[currentActiveQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((ans) => (
              <li key={ans} className="answer">
                <button onClick={() => handleSelectAnswer(ans)}>{ans}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

function quizCompleted() {
  return <div id="summary">
      <img src={quizComplete} alt="quiz complete" />
      <h2>Quiz Completed!</h2>
    </div>;
}