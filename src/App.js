import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ALL_NOTES = []
const LETTERS = ["A", "B", "C", "D", "E", "F", "G"]
const MAJOR_SCALE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
const PITCHES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


const cacluateScale = (startingNote) => {
  let pointer = PITCHES.indexOf(startingNote);
  console.log({ pointer, PITCHES, startingNote });
  const notes = [];
  MAJOR_SCALE_INTERVALS.map((interval) => {
    notes.push(PITCHES[pointer]);
    pointer += interval
    console.log({ pointer })
    if (pointer == 12) {
      pointer = 0;
    } else if (pointer === 13) {
      pointer = 1;
    }
  });
  notes.push(PITCHES[PITCHES.indexOf(startingNote)]);
  console.log({ notes })
  return notes;
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      tonic: "C", 
      scale:[]
    }
  };

  componentDidMount(){
    this.setState((prev) => {
      return {
        scale:cacluateScale( prev.tonic)
      }
    })
  }





  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <h3>{this.state.tonic}</h3>
        </p>
        <ul>
          {this.state.scale.map((note) => {
            return <li>{note}</li>
          })}
          </ul>
      </div>
    );
  }
}

export default App;
