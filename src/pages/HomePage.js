import React from 'react';

const HomePage = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen text-white py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center pt-32 pb-20">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
            Welcome to Crazy Game
          </h2>
          <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-light drop-shadow-lg">
            Experience the ultimate gaming adventure
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Dive into a world of exciting games, compete with players worldwide, and unlock amazing achievements. 
            Get ready for an adrenaline-pumping gaming experience like no other!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
