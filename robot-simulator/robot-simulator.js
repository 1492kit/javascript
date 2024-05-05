//
// This is only a SKELETON file for the 'Robot Simulator' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  constructor() {
    this.direction = 'north';
  }

  get bearing() {
    return this.direction;
  }

  get coordinates() {
    return [this.x, this.y];
  }

  place({ x, y, direction }) {
    if (direction === 'north' || direction === 'east' || direction === 'south' || direction === 'west') {
      this.direction = direction;
      this.x = x;
      this.y = y;
    } else {
      throw new InvalidInputError('Invalid Input');
    }
  }

  evaluate(instructions) {
    for (let i = 0; i < instructions.length; i += 1) {
      if (instructions[i] === 'R') {
        if (this.direction === 'north') {
          this.direction = 'east';
        } else if (this.direction === 'east') {
          this.direction = 'south';
        } else if (this.direction === 'south') {
          this.direction = 'west';
        } else if (this.direction === 'west') {
          this.direction = 'north';
        }
      } else if (instructions[i] === 'L') {
        if (this.direction === 'north') {
          this.direction = 'west';
        } else if (this.direction === 'east') {
          this.direction = 'north';
        } else if (this.direction === 'south') {
          this.direction = 'east';
        } else if (this.direction === 'west') {
          this.direction = 'south';
        }
      } else if (instructions[i] === 'A') {
        if (this.direction === 'north') {
          this.y += 1;
        } else if (this.direction === 'east') {
          this.x += 1;
        } else if (this.direction === 'south') {
          this.y -= 1;
        } else if (this.direction === 'west') {
          this.x -= 1;
        }
      }
    }
  }
}
