import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gridSize = 20;
  const gameSpeed = 150;

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    return newFood;
  };

  const moveSnake = () => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameInterval);
  }, [direction, gameOver, isPaused, food]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, isPaused]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const renderCell = (x, y) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.slice(1).some((segment) => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let cellClass = 'w-4 h-4 border border-gray-700';
    
    if (isSnakeHead) {
      cellClass += ' bg-cyan-400 rounded-full';
    } else if (isSnakeBody) {
      cellClass += ' bg-cyan-500';
    } else if (isFood) {
      cellClass += ' bg-red-500 rounded-full animate-pulse';
    } else {
      cellClass += ' bg-gray-800';
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg')`,
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
              Snake Game
            </h1>
            <p className="text-gray-300 mb-2">
              Use arrow keys to move. Eat the red food to grow and score!
            </p>
            <p className="text-gray-400 text-sm">Press SPACE to pause</p>
          </div>

          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-cyan-400 mb-2">Score: {score}</div>
            {gameOver && (
              <div className="text-xl text-red-400 font-bold mb-4">Game Over! Final Score: {score}</div>
            )}
            {isPaused && !gameOver && (
              <div className="text-xl text-yellow-400 font-bold mb-4">Paused</div>
            )}
          </div>

          <div className="flex justify-center mb-6 overflow-x-auto">
            <div 
              className="grid gap-0 p-4 bg-gray-900/50 rounded-lg border-2 border-cyan-500/30"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                width: 'fit-content'
              }}
            >
              {Array.from({ length: gridSize }, (_, y) =>
                Array.from({ length: gridSize }, (_, x) => renderCell(x, y))
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {gameOver ? 'Play Again' : 'Reset'}
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105"
              disabled={gameOver}
            >
              {isPaused ? 'Resume' : 'Pause'}
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

export default Snake;
