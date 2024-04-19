// This is only a SKELETON file for the 'Robot Name' exercise. It's been
// provided as a convenience to get your started writing code faster.

export class Robot {
  constructor() {
    this.releaseName = Robot.releaseNames();
  }

  static releaseNamesBase = [];

  static releaseNames() {
    let releaseName;
    for (let i = 0; ; i += 1) {
      const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const symbol1 = symbols[Math.floor(Math.random() * symbols.length)];
      const symbol2 = symbols[Math.floor(Math.random() * symbols.length)];
      const symbol3 = Math.floor(Math.random() * 10);
      const symbol4 = Math.floor(Math.random() * 10);
      const symbol5 = Math.floor(Math.random() * 10);
      releaseName = symbol1 + symbol2 + symbol3 + symbol4 + symbol5;
      if (!Robot.releaseNamesBase.includes(releaseName)) {
        Robot.releaseNamesBase.push(releaseName);
        break;
      }
    }
    return releaseName;
  }

  get name() {
    return this.releaseName;
  }

  set name(newName) {
    if (newName) {
      throw new this.ValueError('Internal name cannot be modified');
    }
  }

  reset() {
    this.releaseName = Robot.releaseNames();
  }
}

export class ValueError extends Error {
}
