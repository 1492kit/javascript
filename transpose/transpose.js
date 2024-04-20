//
// This is only a SKELETON file for the 'Transpose' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const transpose = (input) => {
  if (input.length === 0) {
    return [];
  }
  //  определяем длину самого длинного элемента input
  let inputMaxLength = () => {
    inputMaxLength = input[0].length;
    for (let i = 1; i < input.length; i += 1) {
      if (inputMaxLength < input[i].length) {
        inputMaxLength = input[i].length;
      }
    }
    return inputMaxLength;
  };
  const tInputColomns = input.length;
  const tInputRows = inputMaxLength(input);
  const tInput = [];
  for (let i = 0; i < tInputRows; i += 1) {
    const newElements = [];
    for (let y = 0; y < tInputColomns; y += 1) {
      newElements.push(input[y][i]);
    }
    //  удаляем undefined справа от значимых элементов
    while (!newElements.at(-1)) {
      newElements.splice(-1, 1);
    }
    //  заменяем оставшиеся undefined на пробелы
    for (let w = 0; w < newElements.length; w += 1) {
      if (!newElements.at(w)) {
        newElements.splice(w, 1, ' ');
      }
    }
    tInput.push(newElements.join(''));
  }
  return tInput;
};
