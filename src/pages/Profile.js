import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              {user.name}
            </h1>
            <p className="text-gray-400 text-lg">{user.email}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-black/50 rounded-lg p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm font-medium">Full Name</label>
                  <p className="text-white text-lg mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Email Address</label>
                  <p className="text-white text-lg mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Member Since</label>
                  <p className="text-white text-lg mt-1">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">User ID</label>
                  <p className="text-gray-300 text-sm mt-1 font-mono">{user.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
              href="/"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
