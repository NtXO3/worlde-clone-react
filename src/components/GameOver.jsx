import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

const GameOver = () => {
    const { gameOver, setGameOver, correctWord, currAttempt, playAgain } = useContext(AppContext)
    return (
        <div className='game__over'>
            {gameOver.guessedWord ? "You correctly guessed the word" : "You failed"}
            <h1 className='game__over--correct--word'>The correct word was: {correctWord} </h1>
            {
                gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts</h3>)
            }
            <button className='btn' onClick={playAgain}>Play Again</button>
        </div>
    );
}

export default GameOver;
