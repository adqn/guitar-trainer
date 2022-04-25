const c_bebop_major_ascending = require('./c_bebop_major_ascending.png');
const c_ionian = require('./c_ionian_scale.png');
const lost_woods = require('./lost_woods.png');

const CNotes = require('./chords/C-notes.png');
const CDegrees = require('./chords/C-degrees.png');
const Cm7Notes = require('./chords/Cm7-notes.png');
const Cm7Degrees = require('./chords/Cm7-degrees.png');

export const score_list = [
  {
    name: "C bebop major ascending",
    score: c_bebop_major_ascending
  },
  {
    name: "C Ionian",
    score: c_ionian
  },
  {
    name: "Lost Woods",
    score: lost_woods
  }
]

export const chordList = [
  {
    name: "C",
    notes: CNotes,
    degrees: CDegrees
  },
  {
    name: "Cm7",
    notes: Cm7Notes,
    degrees: Cm7Degrees
  },
]