import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const GameSection = () => {
const navigate = useNavigate();
const isLoggedIn = !!localStorage.getItem("currentUser");


  const games = [
    {
      id: 1,
      title: 'Tic-Tac-Toe',
      description: 'Classic strategy game where you match three X\'s or O\'s in a row. Challenge yourself in this timeless brain teaser!',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqtJGwEXzcpvMxCZn-93XnnwUbp4iIkrl2w&s',
      category: 'Strategy',
      rating: 4.8,
      route: '/game/tictactoe'
    },
    {
      id: 2,
      title: 'Snake Game',
      description: 'Control the snake, eat food, and grow longer! Avoid hitting walls or yourself in this classic arcade adventure.',
      image: 'https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg',
      category: 'Arcade',
      rating: 4.9,
      route: '/game/snake'
    },
    {
      id: 3,
      title: 'Memory Game',
      description: 'Test your memory skills by matching pairs of cards. Flip cards and remember their positions to win!',
      image: 'https://ghost-cms.s3.ap-south-1.amazonaws.com/2024/02/memory-boosting-games_truworth-wellness.jpg',
      category: 'Puzzle',
      rating: 4.7,
      route: '/game/memory'
    },
    {
      id: 4,
      title: 'Guess the Number',
      description: 'Can you guess the secret number? Use hints to find the right answer in this exciting number guessing challenge!',
      image: 'https://i.pinimg.com/474x/99/d9/23/99d9239aafdc5dd180eeae9bc30dcc6a.jpg',
      category: 'Brain Teaser',
      rating: 4.6,
      route: '/game/guessnumber'
    },
    {
      id: 5,
      title: 'Rock Paper Scissors',
      description: 'Classic hand game! Choose rock, paper, or scissors and see if you can outsmart your opponent. Best of luck!',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/000/691/497/small/rock-paper-scissors-neon-icons.jpg',
      category: 'Classic',
      rating: 4.9,
      route: '/game/rockpaperscissors'
    }
  ];

  return (
    <section id="games" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Featured Games
          </h2>
          <p className="text-xl text-gray-300">
            Discover our top-rated games and start playing today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/10"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                  ⭐ {game.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20">
                  {game.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{game.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{game.description}</p>
                {isLoggedIn ? (
                      <Link
                        to={game.route}
                        className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg text-center"
                      >
                        Play Now
                      </Link>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="block w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-center opacity-80 hover:opacity-100"
                      >
                        Login to Play
                      </button>
                    )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameSection;
