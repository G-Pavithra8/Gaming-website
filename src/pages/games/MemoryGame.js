import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // ✅ useMemo INSIDE component
  const emojis = useMemo(() => {
  return ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥝', '🍍'];
}, []);

  // ✅ define BEFORE useEffect
  const initializeGame = useCallback(() => {
    const cardPairs = [...emojis, ...emojis];
    const shuffled = [...cardPairs].sort(() => Math.random() - 0.5);

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
  }, [emojis]);

  // ✅ now safe
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

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
  }, [matchedCards, cards]);

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId);
  };

  return (
    <div className="min-h-screen py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-black/80 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Memory Game
            </h1>

            <div className="flex justify-center gap-8 mb-4">
              <div>
                Moves: <span>{moves}</span>
              </div>
              <div>
                Pairs Found: {matchedCards.length / 2} / {emojis.length}
              </div>
            </div>

            {gameWon && (
              <div className="text-green-400 font-bold">
                🎉 You Won! 🎉
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
  {cards.map((card) => (
    <button
      key={card.id}
      onClick={() => handleCardClick(card.id)}
      disabled={isCardFlipped(card.id) || gameWon}
      className={`aspect-square w-full text-2xl font-bold rounded-xl 
        flex items-center justify-center
        transition-all duration-300 transform hover:scale-105
        ${
          isCardFlipped(card.id)
            ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
    >
      {isCardFlipped(card.id) ? card.emoji : '?'}
    </button>
  ))}
</div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              New Game
            </button>

            <Link
              to="/"
              className="border border-white text-white px-6 py-2 rounded"
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