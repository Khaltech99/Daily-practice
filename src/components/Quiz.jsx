import React, { useState } from "react";
import { checkAnswer, data } from "../../quizData";

const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOption = (questionId, chosenAnswer) => {
    const isCorrect = checkAnswer(questionId, chosenAnswer);
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: { selected: chosenAnswer, correct: isCorrect },
    }));
  };

  return (
    <div className="w-full md:w-[500px] md:m-auto">
      <h1 className="text-3xl text-center font-bold mb-6">{data.quizTitle}</h1>

      {data.questions.map((question) => {
        const current = selectedAnswers[question.id];

        return (
          <div key={question.id} className="mb-8">
            <h2 className="text-xl font-semibold">{question.question}</h2>

            <ul className="flex flex-col gap-2 mt-3">
              {question.options.map((option, index) => {
                const isSelected = current?.selected === option;
                const isCorrect = current?.correct && isSelected;
                const isWrong =
                  current && isSelected && current.selected !== question.answer;

                return (
                  <li
                    key={index}
                    onClick={() => handleOption(question.id, option)}
                    className={`cursor-pointer px-3 py-2 rounded-lg border 
                      ${
                        isCorrect
                          ? "bg-green-300"
                          : isWrong
                          ? "bg-red-300"
                          : "bg-gray-100"
                      }`}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>

            {current && (
              <p className="mt-2 text-sm">
                {current.correct ? "✅ Correct!" : "❌ Incorrect"}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
