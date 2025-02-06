import {useState, useCallback} from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

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

    const handleSkipAnswer = useCallback(
      () => handleSelectAnswer(null),
      [handleSelectAnswer]);

    if(currentActiveQuestionIndex === QUESTIONS.length) {
        return <Summary userAnswers={userAnswers}/>
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