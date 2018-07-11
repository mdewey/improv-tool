import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const ALL_NOTES = []
const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G"
]
const MAJOR_SCALE_INTERVALS = [
  2,
  2,
  1,
  2,
  2,
  2,
  1
];
const MINOR_SCALE_INTERVALS = [
  2,
  1,
  2,
  2,
  1,
  2,
  2
];
const SCALE_INTERVALS = {
  MAJOR: [...MAJOR_SCALE_INTERVALS],
  MINOR: [...MINOR_SCALE_INTERVALS]
}
const PITCHES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
]

const calculateScale = (startingNote, useDom7) => {
  let pointer = PITCHES.indexOf(startingNote);
  // console.log({pointer, PITCHES, startingNote});
  const notes = [];
  SCALE_INTERVALS
    .MAJOR
    .map((interval, noteNumber) => {
      if (useDom7 && noteNumber === 6) {
        console.log("using dom 7");
        const d7 = pointer-1;
        notes.push(PITCHES[d7]);
      } else {
        notes.push(PITCHES[pointer]);

      }
      pointer += interval
      // console.log({pointer})
      if (pointer == 12) {
        pointer = 0;
      } else if (pointer === 13) {
        pointer = 1;
      }
    });
  notes.push(PITCHES[PITCHES.indexOf(startingNote)]);
  // console.log({notes})
  return notes;
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      tonic: "D",
      scale: [],
      currentlySelectedScale: "C",
      selectedScale: [],
      chordButtons: LETTERS
    }
  };

  componentDidMount() {
    this.setState((prev) => {
      return {
        scale: calculateScale(prev.tonic),
        selectedScale: calculateScale(prev.currentlySelectedScale)
      }
    })
  }

  updateCurrentScaleToUseDom7(event){
    this.setState((prev) => {
      return {selectedScale: calculateScale(prev.currentlySelectedScale, true), currentlySelectedScale: prev.currentlySelectedScale}
    })
  }

  updateCurrentScale(event, newLetter) {
    this.setState(() => {
      return {selectedScale: calculateScale(newLetter), currentlySelectedScale: newLetter}
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section>
          build chord
          <div>
            <div>
              {this
                .state
                .chordButtons
                .map((letter, i) => {
                  return <button key={i} onClick={(e) => this.updateCurrentScale(e, letter)}>{letter}</button>
                })}
            </div>
            <div>accents</div>
            <div>
              <div>
                Seventh
              </div>
              <div>
                <button onClick={e => this.updateCurrentScaleToUseDom7(e)}>Use Dom 7th</button>
                </div>
            </div>
          </div>
          <div>
            <div>current chord</div>
            <div>
              <button>Add chord to song</button>
            </div>
          </div>
          <div>
            <div>
              <span>currently showing</span>
              <span>{this.state.currentlySelectedScale}</span>

            </div>
            <div>
              <ul>
                {this
                  .state
                  .selectedScale
                  .map((note, i) => {
                    return <li key={i}>{note}</li>
                  })}
              </ul>
            </div>
          </div>
        </section>
        {/* <ul>
          {this
            .state
            .selectedScale
            .map((note) => {
              return <li>{note}</li>
            })}
        </ul> */}
      </div>
    );
  }
}

export default App;
