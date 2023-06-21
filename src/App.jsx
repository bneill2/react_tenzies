import { useState, useEffect } from 'react'
import Confetti from "react-confetti"
import {nanoid} from "nanoid"
import Die from "./Die.jsx"
import './App.css'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let allEqual = dice.every(die => {
      return die.isHeld === true && die.value === dice[0].value
    })

    if(allEqual) {
      setTenzies(true);
    }

  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
          value : Math.ceil(Math.random() * 6),
          isHeld : false
    }
  }

  function allNewDice() {
    let newDice = [];
    for(let i=0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return !die.isHeld ? generateNewDie() : die
      }))
    } else {
      setDice(allNewDice())
      setTenzies(false);
    }
  }
  
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
