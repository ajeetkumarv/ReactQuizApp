import quizComplete from '../assets/quiz-complete.png';

export default function Summary() {
    return <div id="summary">
          <img src={quizComplete} alt="quiz complete" />
          <h2>Quiz Completed!</h2>
        </div>;
}