require('../src/names').into(global);
const selectOutput = require('../src/midi/select-output');
const { Chord, Song } = require('../src');

const song = new Song({
  bpm: 120,
  sections: [{
    scale: HARMONIC_MINOR.C,
    harmony: {
      rate: 2,
      chords: [new Chord([0,2,4], {root: 1, inversion: 1, shifts: [-1]}), SEVENTH(4).inv(-2), TRIAD_PLUS_8(0)] },
    parts: [{
      mode: 'chord',
      rate: 2,
      rhythm: 'XXX=',
      pitches: [0],
      octave: 3,
    }]
  }]
});

selectOutput().then(output => output.play(song));
