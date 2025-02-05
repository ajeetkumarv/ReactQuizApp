import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

import QUESTIONS from '../questions.js';

import { useState } from "react";

export default function Question({
    index,
    onSkipAnswer,
    onSelectAnswer}) {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000; //10 milliseconds

    if(answer.selectedAnswer) { // we have a selected answer
        timer = 1000;
    }

    if(answer.isCorrect !== null) { // it's 'correct' or 'wrong'
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null // we don't know yet
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer // we know the first option is correct, it's set that way.
            })
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct': 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return <div id="question">
        <QuestionTimer
            key={timer}
            timeout={timer}
            onTimeout={answer.selectedAnswer === '' ? onSkipAnswer: null}
            />
        <h2>{index+1}. {QUESTIONS[index].text}</h2>
        <Answers 
            answers={QUESTIONS[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer} />
    </div>;
}