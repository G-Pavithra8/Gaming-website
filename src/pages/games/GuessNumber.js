import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GuessNumber = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hint, setHint] = useState('');

  const startGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGameStarted(true);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameWon(false);
    setHint('');
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const guessNum = parseInt(guess);

    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage('Please enter a number between 1 and 100');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (guessNum === targetNumber) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts!`);
      setGameWon(true);
      setHint('');
    } else if (guessNum < targetNumber) {
      setMessage('Too low! Try a higher number.');
      const diff = targetNumber - guessNum;
      if (diff <= 5) setHint('Very close!');
      else if (diff <= 10) setHint('Getting warmer!');
      else setHint('Too cold!');
    } else {
      setMessage('Too high! Try a lower number.');
      const diff = guessNum - targetNumber;
      if (diff <= 5) setHint('Very close!');
      else if (diff <= 10) setHint('Getting warmer!');
      else setHint('Too cold!');
    }

    setGuess('');
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://i.pinimg.com/474x/99/d9/23/99d9239aafdc5dd180eeae9bc30dcc6a.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Guess the Number
            </h1>
            <p className="text-gray-300 mb-6">
              I'm thinking of a number between 1 and 100. Can you guess it?
            </p>
          </div>

          {!gameStarted ? (
            <div className="text-center space-y-4">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg text-xl"
              >
                Start Game
              </button>
              <div>
                <Link
                  to="/"
                  className="inline-block bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-xl text-gray-300 mb-2">
                  Attempts: <span className="text-cyan-400 font-bold">{attempts}</span>
                </div>
                {message && (
                  <div
                    className={`text-xl font-bold mb-2 ${
                      gameWon ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {message}
                  </div>
                )}
                {hint && !gameWon && (
                  <div className="text-lg text-purple-400">{hint}</div>
                )}
              </div>

              <form onSubmit={handleGuess} className="mb-6">
                <div className="w-full max-w-sm mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter your guess (1-100)"
                    className="px-4 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-center text-lg w-full sm:flex-1 sm:min-w-0"
                    disabled={gameWon}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={gameWon}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  >
                    Guess
                  </button>
                </div>
              </form>

              {gameWon && (
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-gray-300 text-lg">
                    Great job! You found the number in {attempts} attempts!
                  </p>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {gameStarted && (
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                New Game
              </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessNumber;
