import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🎮', '🎯', '🎲', '🎨', '🎪', '🎭', '🎬', '🎤'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [...emojis, ...emojis];
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    const initialCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
    }));
    setCards(initialCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || matchedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;
      const firstEmoji = cards.find((c) => c.id === firstCard)?.emoji;
      const secondEmoji = cards.find((c) => c.id === secondCard)?.emoji;

      if (firstEmoji === secondEmoji) {
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedCards, cards.length]);

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId);
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://ghost-cms.s3.ap-south-1.amazonaws.com/2024/02/memory-boosting-games_truworth-wellness.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Memory Game
            </h1>
            <p className="text-gray-300 mb-6">
              Find all matching pairs! Test your memory skills.
            </p>
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-xl">
                <span className="text-gray-400">Moves: </span>
                <span className="text-cyan-400 font-bold">{moves}</span>
              </div>
              <div className="text-xl">
                <span className="text-gray-400">Pairs Found: </span>
                <span className="text-purple-400 font-bold">{matchedCards.length / 2}</span>
                <span className="text-gray-400"> / {emojis.length}</span>
              </div>
            </div>
            {gameWon && (
              <div className="text-2xl font-bold text-green-400 mb-4 animate-pulse">
                🎉 Congratulations! You Won! 🎉
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6 max-w-sm mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isCardFlipped(card.id) || gameWon}
                className={`w-12 h-12 md:w-14 md:h-14 text-lg md:text-xl font-bold rounded-md transition-all transform hover:scale-105 ${
                  isCardFlipped(card.id)
                    ? 'bg-gradient-to-br from-cyan-500 to-purple-600 border-2 border-cyan-400'
                    : 'bg-gray-800 border-2 border-gray-700 hover:border-cyan-500'
                } ${matchedCards.includes(card.id) ? 'opacity-75' : ''}`}
              >
                {isCardFlipped(card.id) ? card.emoji : '?'}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={initializeGame}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              New Game
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

export default MemoryGame;
