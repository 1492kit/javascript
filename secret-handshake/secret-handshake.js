//
// This is only a SKELETON file for the 'Secret Handshake' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const commands = (number) => {
  const command = [];
  const numberBinary = number.toString(2);
  if (numberBinary.at(-1) === '1') {
    command.push('wink');
  }
  if (numberBinary.at(-2) === '1') {
    command.push('double blink');
  }
  if (numberBinary.at(-3) === '1') {
    command.push('close your eyes');
  }
  if (numberBinary.at(-4) === '1') {
    command.push('jump');
  }
  if (numberBinary.at(-5) === '1') {
    command.reverse();
  }

  return command;
};
