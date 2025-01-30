import { useRef } from 'react';

export default function Answers( {answers, selectedAnswer, answerState, onSelect} ) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);
    }

    return <ul id="answers">
            {
                shuffledAnswers.current.map((ans) => {
                const isSelected = selectedAnswer === ans;
                let cssClass = '';

                if(isSelected) {
                    if (answerState === 'answered') {
                        cssClass = 'selected';
                    }
        
                    if (answerState === 'correct' || answerState === 'wrong') {
                        cssClass = answerState;
                    }
                }

                return <li key={ans} className="answer">
                        <button onClick={() => onSelect(ans)} className={cssClass}>{ans}</button>
                        </li>;
            })}
        </ul>
}