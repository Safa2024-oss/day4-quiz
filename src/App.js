import { useState } from 'react';
import './App.css';

const questions = [
  {
    question: 'What does JSX stand for?',
    options: ['Java Syntax Extension', 'JavaScript XML', 'JSON Extended', 'Just Simple X'],
    correctAnswer: 'JavaScript XML',
  },
  {
    question: 'Which hook is used to manage state in a function component?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    correctAnswer: 'useState',
  },
  {
    question: 'What does useEffect run after?',
    options: ['Before the component renders', 'After the component renders', 'Only on unmount', 'Never automatically'],
    correctAnswer: 'After the component renders',
  },
  {
    question: 'How do you pass data from parent to child component?',
    options: ['State', 'Props', 'Context only', 'Redux only'],
    correctAnswer: 'Props',
  },
  {
    question: 'What array method creates a new array without mutating the original?',
    options: ['push()', 'splice()', 'map()', 'sort()'],
    correctAnswer: 'map()',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleAnswerClick(option) {
    if (showResult) return;
    setSelectedAnswer(option);
    setShowResult(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizFinished(false);
  }

  if (quizFinished) {
    return (
      <div className="app">
        <h1>Quiz Finished!</h1>
        <p className="final-score">
          You scored {score} / {questions.length}
        </p>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>React Quiz</h1>
      <p className="progress">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h2>{currentQuestion.question}</h2>

      <div className="options">
        {currentQuestion.options.map((option) => {
          let className = 'option';
          if (showResult) {
            if (option === currentQuestion.correctAnswer) {
              className += ' correct';
            } else if (option === selectedAnswer) {
              className += ' wrong';
            }
          }
          return (
            <button
              key={option}
              className={className}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <button className="next-btn" onClick={handleNext}>
          {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}

export default App;