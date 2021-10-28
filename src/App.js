import './App.css';

import React, { useState, useEffect } from "react";
import Tile from "./components/Tile";
import { Fireworks } from 'fireworks/lib/react'

// must contain 25 elements
const data = [
  "(car noises in the background)",
  "is ___ in the meeting room?",
  "i need to catch the train in 10 minutes",
  "huge kudos to X",
  "hello",
  "there was traffic at the street ",
  "can everyone see the board?",
  "can you email that to everyone ",
  "sorry, the meeting room is reserved",
  "could you print the slides afterwards?",
  "sorry, i couldn't find the room ",
  "It’s only a test",
  "OFFLINE MEETING BINGO",
  "you will send the minutes?",
  "i need to answer my phone call",
  "can we have a bring to grab coffee?",
  "can we take this online?",
  "do you see clearly the slides?",
  "is everyone in the room?",
  "can I come in front to explain you",
  "i need to bring the charging cable",
  "do you have a longer HDMI cable",
  "did you lock the room ",
  "where is the 'bingo' room",
  "shall we go for dinner?"
];

const NUMBER_OF_TILES = 25;
const CELEBRATION_TIME = 3000; //3 seconds
const freeCellIndex = Math.floor(NUMBER_OF_TILES / 2);

function App() {
  const [checked, setChecked] = useState(new Array(25).fill().map((item, idx) => idx === freeCellIndex));
  const [completed, setCompleted] = useState(new Array(25).fill().map((item, idx) => idx === freeCellIndex));
  const [celebratedWins, setCelebratedWins] = useState(0);
  const [isCelebrationTime, setIsCelebrationTime] = useState(false);


  function Reward() {
    const fxProps = {
      count: 3,
      interval: 300,
      colors: ['#cc3333', '#4CAF50', '#81C784'],
      calc: (props, i) => ({
        ...props,
        x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
        y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
      })
    }
    setTimeout(() => {
      setIsCelebrationTime(false);
    }, CELEBRATION_TIME);

    return <Fireworks {...fxProps} />
  }

  useEffect(() => {
    const range = [0, 1, 2, 3, 4];
    let newCompleted = completed;
    let numberOfWins = 0;

    // check vertical lines
    range.forEach(column => {
      const hasBingo = range.every(row => checked[row * 5 + column])
      if (hasBingo) {
        numberOfWins++;
        range.map(row => {
          newCompleted[row * 5 + column] = true;
          return null;
        })

      }
    })

    // check horizontal lines
    range.forEach(row => {
      const hasBingo = range.every(column => checked[row * 5 + column])
      if (hasBingo) {
        numberOfWins++;
        range.map(column => {
          newCompleted[row * 5 + column] = true;
          return null;
        })
      }
    })

    // check diagonal left
    const hasDiagonalLeftBingo = range.every(index => checked[index * 5 + index])
    if (hasDiagonalLeftBingo) {
      numberOfWins++;
      range.map(index => {
        newCompleted[index * 5 + index] = true;
        return null;
      })
    }
    // check diagonal right
    const hasDiagonalRightBingo = range.every(index => checked[index * 5 + 4 - index])
    if (hasDiagonalRightBingo) {
      numberOfWins++;
      range.map(index => {
        newCompleted[index * 5 + 4 - index] = true;
        return null;
      })
    }

    if (numberOfWins > celebratedWins) {
      setCelebratedWins(numberOfWins);
      setIsCelebrationTime(true);
      setCompleted(newCompleted);
    }
  }, [checked, celebratedWins, completed]);

  const toggle = index => {
    if (index === freeCellIndex || completed[index] || isCelebrationTime) {
      return;
    }
    let newChecked = [...checked];
    newChecked[index] = !checked[index];
    setChecked(newChecked);
  }

  return (
    <div className="app">
      <h1>OFFLINE MEETING BINGO</h1>
      <div className="app__body">
        {data.map((data, index) => (
          <Tile
            key={index}
            id={index}
            isSet={!!checked[index]}
            isCompleted={completed[index]}
            onToggle={() => toggle(index)}
          >
            {data}
          </Tile>
        ))}
      </div>
      {isCelebrationTime ? <Reward /> : null}
    </div >
  );
}

export default App;