require('../src/names').into(global);
const selectOutput = require('./helpers/select-output');
const { Song } = require('../src/generators');

const song = new Song({
  bpm: 120,
  sections: [{
    scale: MAJOR.C,
    tracks: [{
      mode: 'scale',
      rate: 1/2,
      rhythm: 'XxXxXxxXxxXxXxX===', // TODO: rhythm should not be necessary in this case (port harmony default to rhythm class?) but it is useful!
      pitches: [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
    }]
  }]
});

selectOutput().then(output => output.play(song));
