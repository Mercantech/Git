import { useState } from 'react';
import type { QuizQuestion } from '../../content/releases';
import './mini-quiz.css';

interface Props {
  questions: QuizQuestion[];
}

type Answers = Record<string, string>;

export default function MiniQuiz({ questions }: Props) {
  const [answers, setAnswers] = useState<Answers>({});

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const correctCount = questions.filter((q) => answers[q.id] === q.correctId).length;

  function selectAnswer(questionId: string, optionId: string) {
    if (answers[questionId]) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  function reset() {
    setAnswers({});
  }

  return (
    <div className="mini-quiz">
      {questions.map((question) => {
        const selected = answers[question.id];
        const isAnswered = !!selected;
        const isCorrect = selected === question.correctId;

        return (
          <div key={question.id} className="quiz-question">
            <p className="quiz-question__text">{question.question}</p>
            <ul className="quiz-options" role="list">
              {question.options.map((option) => {
                let className = 'quiz-option';
                if (isAnswered) {
                  if (option.id === question.correctId) {
                    className += ' quiz-option--correct';
                  } else if (option.id === selected) {
                    className += ' quiz-option--incorrect';
                  }
                } else if (selected === option.id) {
                  className += ' quiz-option--selected';
                }

                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      className={className}
                      onClick={() => selectAnswer(question.id, option.id)}
                      disabled={isAnswered}
                      aria-pressed={selected === option.id}
                    >
                      {option.text}
                    </button>
                  </li>
                );
              })}
            </ul>
            {isAnswered && (
              <div className={`quiz-feedback${isCorrect ? ' quiz-feedback--correct' : ' quiz-feedback--incorrect'}`}>
                {isCorrect ? '✓ Korrekt! ' : '✗ Ikke helt. '}
                {question.explanation}
              </div>
            )}
          </div>
        );
      })}

      {allAnswered && (
        <div className={`quiz-score${correctCount === questions.length ? ' quiz-score--perfect' : ''}`}>
          Du fik {correctCount} ud af {questions.length} rigtige!
          <button type="button" className="quiz-reset" onClick={reset}>
            Prøv igen
          </button>
        </div>
      )}
    </div>
  );
}
