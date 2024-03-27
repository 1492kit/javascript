//
// This is only a SKELETON file for the 'Series' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Series {
  constructor(series) {
    this.series = series;
  }

  slices(sliceLength) {
    this.sliceLength = sliceLength;
    this.arraySlices = [];
    if (this.sliceLength === 0) {
      throw new ValueError('slice length cannot be zero');
    }
    if (this.sliceLength < 0) {
      throw new ValueError('slice length cannot be negative');
    }
    if (this.series === '') {
      throw new ValueError('series cannot be empty');
    }
    if (this.series.length < this.sliceLength) {
      throw new ValueError('slice length cannot be greater than series length');
    } else {
      for (let i = 0; i <= (this.series.length - this.sliceLength); i += 1) {
        const slices = this.series.substr(i, this.sliceLength);
        const arrayStrings = slices.split('');
        const arrayNumbers = arrayStrings.map((item) => Number(item));
        this.arraySlices.push(arrayNumbers);
      }
      return this.arraySlices;
    }
  }
}

export class ValueError extends Error {
}
