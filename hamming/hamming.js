//
// This is only a SKELETON file for the 'Hamming' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const compute = (string1, string2) => {
  const arrString1 = string1.split('');
  const arrString2 = string2.split('');
  let hamming = 0;
  if (string1.length !== string2.length) {
    throw new Error('strands must be of equal length');
  }
  for (let i = 0; i < arrString1.length; i += 1) {
    if (arrString1[i] !== arrString2[i]) {
      hamming += 1;
    }
  }
  return hamming;
};
