import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem("currentUser");
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();

    window.addEventListener("userLogin", checkLoginStatus);
    window.addEventListener("userLogout", checkLoginStatus);
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("userLogin", checkLoginStatus);
      window.removeEventListener("userLogout", checkLoginStatus);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setSidebarOpen(false);
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  const handleNavClick = () => setSidebarOpen(false);

  return (
    <header className="bg-black/90 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-white/10">
      
      {/* 🔥 HEADER BAR */}
      <div className="w-full px-4 py-4 flex items-center justify-between">
        
        {/* LEFT: MENU + LOGO */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          >
            Crazy Game
          </Link>
        </div>

        {/* RIGHT: LOGIN / WELCOME */}
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Login
          </button>
        ) : (
          <div className="text-cyan-400 font-semibold">Welcome!</div>
        )}
      </div>

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/95 backdrop-blur-md text-white transform transition-transform duration-300 z-50 border-r border-white/10 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-blue-600/20"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              onClick={handleNavClick}
              className="block py-3 px-4 rounded-lg hover:bg-blue-600/20"
            >
              Profile
            </Link>

            <Link
              to="/about"
              onClick={handleNavClick}
              className="block py-3 px-4 rounded-lg hover:bg-blue-600/20"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={handleNavClick}
              className="block py-3 px-4 rounded-lg hover:bg-blue-600/20"
            >
              Contact Us
            </Link>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-red-600/20"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </header>
  );
};

export default Header;
