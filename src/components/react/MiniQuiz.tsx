import { useMemo, useState } from 'react';
import type { QuizQuestion } from '../../content/releases';
import './mini-quiz.css';

interface Props {
  questions: QuizQuestion[];
}

type Answers = Record<string, string>;

function shuffleOptions<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function MiniQuiz({ questions }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffledQuestions = useMemo(
    () => questions.map((q) => ({ ...q, options: shuffleOptions(q.options) })),
    [questions, shuffleKey],
  );

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === shuffledQuestions.length;
  const correctCount = shuffledQuestions.filter((q) => answers[q.id] === q.correctId).length;

  function selectAnswer(questionId: string, optionId: string) {
    if (answers[questionId]) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  function reset() {
    setAnswers({});
    setShuffleKey((k) => k + 1);
  }

  return (
    <div className="mini-quiz">
      {shuffledQuestions.map((question) => {
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
        <div className={`quiz-score${correctCount === shuffledQuestions.length ? ' quiz-score--perfect' : ''}`}>
          Du fik {correctCount} ud af {shuffledQuestions.length} rigtige!
          <button type="button" className="quiz-reset" onClick={reset}>
            Prøv igen
          </button>
        </div>
      )}
    </div>
  );
}
