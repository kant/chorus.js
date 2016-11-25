const PitchClass = require('./pitch-class');
const Pitch = require('./pitch');
const { mod } = require('../utils');

/**
 * A list of pitch classes, which can be converted to pitches
 *
 * @see https://en.wikipedia.org/wiki/Scale_(music)
 */
class Scale {

  constructor(intervals, root=new PitchClass(0)) {
    if (!(intervals instanceof Array)) throw new TypeError('Scale intervals must be an Array');
    if (!(root instanceof PitchClass)) root = new PitchClass(root);
    // list of integers for the interval distance between consecutive notes of the scale:
    // intervals sum is root.pitchesPerOctave (usually 12) for octave-repeating scales
    this.intervals = Object.freeze(intervals.slice());
    this.root = root; // a pitch class
    Object.freeze(this);
  }

  get length() {
    return this.intervals.length;
  }

  /**
   * The size of the scale in semitones (keys on a piano keyboard).
   * For most scales, this value will be 12, which means the scale repeats every octave.
   * In other words, when this is 12, if the scale starts on a C, it will end on the next higher C.
   */
  get semitones() {
    return this.intervals.reduce((a,b) => a + b, 0);
  }

  // The raw value for the pitch class that hasn't had modular math applied to "normalize" it
  // This is so octave offsets can be calculated properly in Scale.pitchAt()
  rawPitchClassValue(position) {
    const degree = position.offset || position.valueOf();
    let pitchClassValue = this.root.valueOf();
    for (let i =  0; i < degree;  i++) pitchClassValue += this.intervals[i % this.length];
    for (let i = -1; i >= degree; i--) pitchClassValue -= this.intervals[mod(i, this.length)];
    pitchClassValue += position.shift || 0;
    return pitchClassValue;
  }

  /**
   *
   * @param position
   * @returns {PitchClass}
   */
  pitchClassAt(position) {
    return new PitchClass(this.rawPitchClassValue(position), this.root.pitchesPerOctave);
  }

  /**
   *
   * @param position
   * @param octave
   * @returns {Pitch}
   */
  pitchAt(position, { octave = 4 } = {}) {
    const pitchClassValue = this.rawPitchClassValue(position);
    const pitchClass = new PitchClass(pitchClassValue, this.root.pitchesPerOctave);
    return new Pitch(pitchClass, octave + Math.floor(pitchClassValue / this.root.pitchesPerOctave));
  }

  /**
   * @deprecated
   */
  pitch(position, options) {
    return this.pitchAt(position, options)
  }
}

module.exports = Scale;
