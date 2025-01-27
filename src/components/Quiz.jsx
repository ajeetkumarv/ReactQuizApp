import {useState} from 'react';

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
        return <p>Quiz completed</p>;
    }

    return (
      <div id="quiz">
        <div id="question">
          <h2>{QUESTIONS[currentActiveQuestionIndex].text}</h2>
          <ul id="answers">
            {QUESTIONS[currentActiveQuestionIndex].answers.map((ans) => (
              <li key={ans} className="answer">
                <button onClick={() => handleSelectAnswer(ans)}>{ans}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}