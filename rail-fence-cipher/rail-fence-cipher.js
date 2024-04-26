//
// This is only a SKELETON file for the 'Rail Fence Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const encode = (str, n) => {
  const arr = [];
  let fence = '';
  for (let i = 0; i < n; i += 1) {
    arr.push([]);
  }
  let x = 0; // счетчик для символов фразы
  let y = 0; // счетчик рядов на возрастание
  let m = n - 2; // счетчик рядов на убывние
  let w = 0; // счетчик циклов прохода по рядам вниз-вверх
  while (x < str.length) {
    if (w < n) {
      arr[y][x] = str[x];
      x += 1;
      y += 1;
      w += 1;
    } else if (w < 2 * (n - 1)) {
      arr[m][x] = str[x];
      x += 1;
      m -= 1;
      w += 1;
    } else {
      w = 0;
      y = 0;
      m = n - 2;
    }
  }

  for (let z = 0; z < n; z += 1) {
    fence += arr[z].join('');
  }

  return fence;
};

export const decode = (str, n) => {
  const arr = [];
  let fence = '';
  for (let i = 0; i < n; i += 1) {
    arr.push([]);
  }

  let x = 0;
  let y = 0;
  let m = n - 2;
  let w = 0;
  while (x < str.length) {
    if (w < n) {
      arr[y][x] = '?';
      x += 1;
      y += 1;
      w += 1;
    } else if (w < 2 * (n - 1)) {
      arr[m][x] = '?';
      x += 1;
      m -= 1;
      w += 1;
    } else {
      w = 0;
      y = 0;
      m = n - 2;
    }
  }

  let i = 0; // счетчик для символов фразы
  let j = 0; // счетчик для рядов массива
  while (i < str.length) {
    if (arr[j].indexOf('?') !== -1) {
      arr[j].splice(arr[j].indexOf('?'), 1, str[i]);
      i += 1;
    } else {
      j += 1;
    }
  }

  let a = 0; // счетчик для символов фразы
  let b = 0; // счетчик рядов на возрастание
  let c = n - 2; // счетчик рядов на убывние
  let d = 0; // счетчик циклов прохода по рядам вниз-вверх
  while (a < str.length) {
    if (d < n) {
      fence += arr[b][a];
      a += 1;
      b += 1;
      d += 1;
    } else if (d < 2 * (n - 1)) {
      fence += arr[c][a];
      a += 1;
      c -= 1;
      d += 1;
    } else {
      d = 0;
      b = 0;
      c = n - 2;
    }
  }

  return fence;
};
