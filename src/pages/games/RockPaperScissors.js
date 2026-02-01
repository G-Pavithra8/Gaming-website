import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  const choices = ['rock', 'paper', 'scissors'];
  const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return 'tie';
    }
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const handleChoice = (choice) => {
    const compChoice = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    const winner = determineWinner(choice, compChoice);
    
    if (winner === 'player') {
      setResult('You Win! 🎉');
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    } else if (winner === 'computer') {
      setResult('Computer Wins! 😢');
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    } else {
      setResult("It's a Tie! 🤝");
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0, ties: 0 });
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/000/691/497/small/rock-paper-scissors-neon-icons.jpg')`,
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
              Rock Paper Scissors
            </h1>
            <p className="text-gray-300 mb-6">
              Choose your weapon! Rock beats Scissors, Paper beats Rock, Scissors beats Paper.
            </p>
          </div>

          <div className="text-center mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <div className="text-2xl text-gray-400 mb-2">You</div>
                <div className="text-5xl mb-2">
                  {playerChoice ? emojis[playerChoice] : '❓'}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {playerChoice || 'Choose'}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-3xl">VS</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <div className="text-2xl text-gray-400 mb-2">Computer</div>
                <div className="text-5xl mb-2">
                  {computerChoice ? emojis[computerChoice] : '❓'}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {computerChoice || 'Waiting'}
                </div>
              </div>
            </div>

            {result && (
              <div className={`text-2xl font-bold mb-4 ${
                result.includes('Win') ? 'text-green-400' : 
                result.includes('Loses') ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {result}
              </div>
            )}

            <div className="bg-black/50 rounded-lg p-4 mb-6 border border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Your Wins</div>
                  <div className="text-2xl font-bold text-cyan-400">{score.player}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Ties</div>
                  <div className="text-2xl font-bold text-yellow-400">{score.ties}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Computer Wins</div>
                  <div className="text-2xl font-bold text-purple-400">{score.computer}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleChoice(choice)}
                className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/40 hover:to-purple-600/40 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-xl p-6 transition-all transform hover:scale-110 active:scale-95"
              >
                <div className="text-6xl mb-2">{emojis[choice]}</div>
                <div className="text-white font-bold capitalize">{choice}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Reset Score
            </button>
            <Link
              to="/"
              className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
