import logoImg from '../assets/quiz-logo.png'

export default function Header() {
    return <header>
        <img src={logoImg} alt="quiz app logo"/>
        <h1>Quiz App</h1>
    </header>
}