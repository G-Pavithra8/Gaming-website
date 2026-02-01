import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from './pages/HomePage';
import GameSection from './pages/GameSection';
import TicTacToe from './pages/games/TicTacToe';
import Snake from './pages/games/Snake';
import MemoryGame from './pages/games/MemoryGame';
import GuessNumber from './pages/games/GuessNumber';
import RockPaperScissors from './pages/games/RockPaperScissors';
import './App.css';


function App() {
  const location = useLocation();
  const isGamePage = location.pathname.startsWith('/game/');

  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HomePage />
                <GameSection />
              </>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game/tictactoe" element={<TicTacToe />} />
          <Route path="/game/snake"
              element={
                <PrivateRoute>
                  <Snake />
                </PrivateRoute>
              }
            />

          <Route path="/game/memory" element={<PrivateRoute><MemoryGame /></PrivateRoute>} />
          <Route path="/game/guessnumber" element={<PrivateRoute><GuessNumber /></PrivateRoute>} />
          <Route path="/game/rockpaperscissors" element={<PrivateRoute><RockPaperScissors /></PrivateRoute>} />
        </Routes>
      </main>
      {!isGamePage && <Footer />}
    </div>
  );
}

export default App;
