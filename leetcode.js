import { LogIn } from "lucide-react";

//PALINDROME CODE
export const palindrome = (x) => {
  const y = x.toString();
  const backward = [...y].reverse().join("");
  return y === backward ? true : false;
};

console.log(palindrome(222));

//CONVERT ROMAN FIGURE TO VALUES

// function convertRomanToIntegers(x) {
//   const input = x.toString().toUpperCase().split("");
//   const romanNumerals = {
//     I: 1,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000,
//   };
//   return input.reduce((total, currentValue, currentIndex) => {
//     const currentNumber = romanNumerals[currentValue];
//     const nextNumber = romanNumerals[input[currentIndex + 1]];
//     if (currentNumber < nextNumber) {
//       return total - currentNumber;
//     } else {
//       return total + currentNumber;
//     }
//   }, 0);
// }

//console.log(convertRomanToIntegers("vi"));
