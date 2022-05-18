import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App'

const Letter = ({ letterPos, attemptValue }) => {
    const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext)
    const letter = board[attemptValue][letterPos]

    const correct = correctWord.toUpperCase()[letterPos] === letter
    const almost =  !correct && letter !== '' && correctWord.includes(letter)

    const letterState = 
        currAttempt.attempt > attemptValue && (correct ? "correct" : almost ? "almost" : "error")
    
    const letterStyle = !!letterState ? letterState : ""

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters(prev => [...prev, letter])
        }
    }, [currAttempt.attempt])
    return (
        <div className='letter' id={letterStyle}>
            {letter}
        </div>
    );
}

export default Letter;
