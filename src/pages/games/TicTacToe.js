import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button
        className="w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl font-bold bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handleClick(index)}
        disabled={board[index] || winner}
      >
        <span className={board[index] === 'X' ? 'text-cyan-400' : 'text-purple-400'}>
          {board[index]}
        </span>
      </button>
    );
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqtJGwEXzcpvMxCZn-93XnnwUbp4iIkrl2w&s')`,
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
              Tic-Tac-Toe
            </h1>
            <p className="text-gray-300 mb-6">
              Classic game of X's and O's. Get three in a row to win!
            </p>
          </div>

          <div className="text-center mb-6">
            {winner ? (
              <div className="text-2xl font-bold mb-4">
                {winner === 'Draw' ? (
                  <span className="text-yellow-400">It's a Draw!</span>
                ) : (
                  <span className={winner === 'X' ? 'text-cyan-400' : 'text-purple-400'}>
                    Player {winner} Wins! 🎉
                  </span>
                )}
              </div>
            ) : (
              <div className="text-xl text-gray-300 mb-4">
                Current Player: <span className={isXNext ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>
                  {isXNext ? 'X' : 'O'}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 justify-center max-w-xs mx-auto">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index}>{renderSquare(index)}</div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Reset Game
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

export default TicTacToe;
