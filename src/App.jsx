import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWordSet, resetBoard } from './Words';
import GameOver from './components/GameOver';

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [correctWord, setCorrectWord] = useState('')
  const [score, setScore] = useState(0)

  useEffect(() => {
    generateWordSet().then(words => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord.toUpperCase())
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) {
      return
    }
    if (!disabledLetters.includes(keyVal.toUpperCase())) {
      const newBoard=[...board]
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
      setBoard(newBoard)
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
    }
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) {
      return
    }
    const newBoard=[...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) {
      return
    }
    let currWord = ""
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i]
    }

    // if (wordSet.has(currWord.toLowerCase() + "\r")) {
    //   setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
    // } else {
    //   alert('Word not found')
    // }

    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})

    if(currWord  === correctWord) {
      // + "\r"
      setGameOver({ gameOver: true, guessedWord: true })
      setScore(score + 1)
      return
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
      setScore(0)
    }
  }

  const playAgain = async () => {
    setGameOver({ gameOver: false, guessedWord: false})
    generateWordSet().then(words => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord.toUpperCase())
    })
    setCurrAttempt({attempt: 0, letterPos: 0})
    await resetBoard()
    await setBoard(boardDefault)
    setDisabledLetters([])
  }
  
  return (
    <div className="App">
      <Nav score={score}/>
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, 
        onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, gameOver, setGameOver, playAgain 
      }}>
        <Board />
        {
          gameOver.gameOver ? <GameOver /> : <Keyboard />
        }
      </AppContext.Provider>
    </div>
  );
}

export default App;
