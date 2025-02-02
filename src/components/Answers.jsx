import { useRef } from 'react';

export default function Answers( {answers, selectedAnswer, answerState, onSelect} ) {
    const shuffledAnswers = useRef();
    console.log('Answer state: ', answerState);
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
                        <button
                            onClick={() => onSelect(ans)} className={cssClass}
                            disabled={answerState !== ''}>
                            {ans}
                        </button>
                        </li>;
            })}
        </ul>
}