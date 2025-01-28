import {useState} from 'react';

import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Quick() {
    const [userAnswers, setUserAnswers] = useState([]);

    /* Deriving state from existing data */
    const currentActiveQuestionIndex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    if(currentActiveQuestionIndex === QUESTIONS.length) {
        return quizCompleted();
    }

    const shuffledAnswers = [...QUESTIONS[currentActiveQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);

    return (
      <div id="quiz">
        <div id="question">
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