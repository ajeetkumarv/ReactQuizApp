import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({userAnswers}) {
    return <div id="summary">
          <img src={quizComplete} alt="quiz complete" />
          <h2>Quiz Completed!</h2>
          <div id="summary-stats">
            <p>
              <span className="number">10%</span>
              <span className="text">Skipped</span>
            </p>
            <p>
              <span className="number">10%</span>
              <span className="text">Correct</span>
            </p>
            <p>
              <span className="number">10%</span>
              <span className="text">Wrong</span>
            </p>
          </div>
            <ol>
              {
                userAnswers.map((answer, index) => {

                  let cssStyle = 'user-answer';

                  if (answer === null) {
                    cssStyle += ' skipped';
                  } else if(answer ===  QUESTIONS[index].answers[0]) {
                    cssStyle += ' correct';
                  } else {
                    cssStyle += ' wrong';
                  }

                  return <li key={index+1}>
                    <h3>{index + 1}</h3>
                    <p className='question'>{QUESTIONS[index].text}</p>
                    <p className={cssStyle}>{answer ?? 'Skipped'}</p>
                  </li>;
                })
              }
            </ol>
        </div>;
}