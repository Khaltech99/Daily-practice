import React, { useState } from "react";
import { checkAnswer, data } from "../../quizData";

const Quiz = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, option) => {
    const correct = checkAnswer(questionId, option);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selected: option, correct },
    }));
  };

  return (
    <div className="w-full md:w-[500px] md:m-auto">
      <h1 className="text-3xl text-center font-bold mb-6">{data.quizTitle}</h1>

      {data.questions.map((q) => {
        const selected = answers[q.id];

        return (
          <div key={q.id} className="mb-8">
            <h2 className="text-xl font-semibold">{q.question}</h2>

            <ul className="flex flex-col gap-2 mt-3">
              {q.options.map((opt, i) => {
                const isSelected = selected?.selected === opt;
                const isCorrect = selected?.correct && isSelected;
                const isWrong = isSelected && !selected?.correct;

                let bg = "bg-gray-100";
                if (isCorrect) bg = "bg-green-300";
                if (isWrong) bg = "bg-red-300";

                return (
                  <li
                    key={i}
                    onClick={() => handleAnswer(q.id, opt)}
                    className={`cursor-pointer px-3 py-2 rounded-lg border ${bg}`}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>

            {selected && (
              <p className="mt-2 text-sm">
                {selected.correct ? "✅ Correct!" : "❌ Incorrect"}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
