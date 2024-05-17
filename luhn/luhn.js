//
// This is only a SKELETON file for the 'Luhn' exercise. It's been provided as a
// convenience to get you started writing code faster.

export const valid = (str) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < str.length; i += 1) {
    if (!numbers.includes(Number(str[i]))) {
      return false;
    }
  }

  const arr = str.split('');
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === ' ') {
      arr.splice(i, 1);
    }
  }

  if (arr.length < 2) {
    return false;
  }

  const arrNumbers = arr.map((item) => Number(item));
  for (let i = 2; i <= arrNumbers.length; i += 2) {
    let newNumber = arrNumbers.at(-i) * 2;
    if (newNumber > 9) {
      newNumber -= 9;
    }
    arrNumbers.splice(-i, 1, newNumber);
  }

  const sumNumbers = arrNumbers.reduce((sum, current) => sum + current, 0);

  if (sumNumbers % 10) {
    return false;
  }
  return true;
};
