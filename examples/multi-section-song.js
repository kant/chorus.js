require('../src/names').into(global);
const selectOutput = require('./helpers/select-output');
const { Song } = require('../src');

const song = new Song({
  bpm: 120,
  sections: [
    {
      duration: 8,
      tracks: [{
        rhythm: [1, 1, 1, 1, 1, 1, 1, 1],
        pitches: [C4, D4, E4, G4, F4, D4, A3, D4],
      }]
    },
    {
      duration: 8,
      tracks: [{
        rhythm: [1, 1, 1, 1, 1, 1, 1, 1],
        pitches: [G4, F4, D4, B3, C4, A3, G3, B3],
      }]
    },
    {
      tracks: [{
        rhythm: [1],
        pitches: [C4],
      }]
    }
  ]
});

selectOutput().then(output => output.play(song));
