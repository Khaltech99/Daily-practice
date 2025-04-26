// export const data = {
//   quizTitle: "JavaScript Basics Quiz",
//   questions: [
//     {
//       id: 1,
//       question: "What does `typeof null` return in JavaScript?",
//       options: ["object", "null", "undefined", "boolean"],
//       answer: "object",
//     },
//     {
//       id: 2,
//       question:
//         "Which method is used to parse a JSON string into a JavaScript object?",
//       options: [
//         "JSON.parse()",
//         "JSON.stringify()",
//         "JSON.toObject()",
//         "JSON.convert()",
//       ],
//       answer: "JSON.parse()",
//     },
//     {
//       id: 3,
//       question: "What is the result of `2 + '2'` in JavaScript?",
//       options: ["`4`", "`22`", "`NaN`", "`undefined`"],
//       answer: "`22`",
//     },
//     {
//       id: 4,
//       question: "Which keyword is used to declare a constant in JavaScript?",
//       options: ["var", "let", "const", "define"],
//       answer: "const",
//     },
//     {
//       id: 5,
//       question: "Which of the following is a falsy value in JavaScript?",
//       options: ["0", "[]", "{}", "'false'"],
//       answer: "0",
//     },
//   ],
// };

import axios from "axios";

export async function getQuizQuestions() {
  try {
    const { data } = await axios.get(
      "https://opentdb.com/api.php?amount=15&category=21&type=multiple"
    );
    const { results } = data;
    return results;
  } catch (error) {
    console.log(error);
  }
}

// export function checkAnswer(questionid, selectedOption) {
//   const question = data.questions.find(
//     (question) => question.id === questionid
//   );
//   return question && question.answer === selectedOption;
// }

getQuizQuestions();
