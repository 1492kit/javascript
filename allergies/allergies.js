//
// This is only a SKELETON file for the 'Allergies' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Allergies {
  constructor(testResult) {
    this.testResult = testResult.toString(2);
  }

  list() {
    const allergens = [
      'eggs', 'peanuts', 'shellfish', 'strawberries',
      'tomatoes', 'chocolate', 'pollen', 'cats',
    ];
    const list = [];
    let i = 1;
    while (i <= this.testResult.length && i <= 8) {
      if (this.testResult.at(-i) === '1') {
        list.push(allergens[i - 1]);
      }
      i += 1;
    }

    return list;
  }

  allergicTo(allergen) {
    return this.list().includes(allergen);
  }
}
