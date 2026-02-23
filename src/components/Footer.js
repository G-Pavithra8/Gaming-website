import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-md text-white py-14 mt-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Crazy Game
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crazy Game is an online gaming platform offering classic and
              casual games designed to entertain, challenge, and engage players
              of all ages.
            </p>

            <div className="flex gap-4 mt-5">
              <a 
  href="https://facebook.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:text-cyan-400 transition-colors"
>
  Facebook
</a>

<a 
  href="https://twitter.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:text-cyan-400 transition-colors"
>
  Twitter
</a>

<a 
  href="https://instagram.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:text-cyan-400 transition-colors"
>
  Instagram
</a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#games" className="hover:text-cyan-400 transition-colors">
                  Games
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Games */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Games</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link to="/game/tictactoe" className="hover:text-cyan-400 transition-colors">
                  Tic-Tac-Toe
                </Link>
              </li>
              <li>
                <Link to="/game/snake" className="hover:text-cyan-400 transition-colors">
                  Snake Game
                </Link>
              </li>
              <li>
                <Link to="/game/memory" className="hover:text-cyan-400 transition-colors">
                  Memory Game
                </Link>
              </li>
              <li>
                <Link to="/game/guessnumber" className="hover:text-cyan-400 transition-colors">
                  Guess the Number
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                Email: <span className="text-white">support@crazygame.com</span>
              </li>
              <li>
                Phone: <span className="text-white">+91 90*** *****</span>
              </li>
              <li>
                Location: <span className="text-white">Online Gaming Platform</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 Crazy Game. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-500">
             <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>


            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
