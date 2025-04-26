//PALINDROME CODE
export const palindrome = (x) => {
  const array = x.toString();
  const backwards = x.toString().split("").reverse();
  if (array == backwards.join("")) {
    return true;
  }
  return false;
};
