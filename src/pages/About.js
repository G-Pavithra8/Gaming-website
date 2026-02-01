import React from 'react';

const About = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-center">
            About Crazy Game
          </h1>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Welcome to <span className="text-cyan-400 font-semibold">Crazy Game</span>, your ultimate destination for premium gaming experiences. 
              We are passionate about bringing you the best collection of games that will keep you entertained for hours.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Our Mission</h2>
              <p>
                Our mission is to provide gamers worldwide with access to high-quality, engaging games that offer 
                immersive experiences. We believe gaming should be accessible, fun, and bring people together.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 mt-8">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A diverse collection of premium games across multiple genres</li>
                <li>Regular updates with new games and features</li>
                <li>Seamless gaming experience with high performance</li>
                <li>Community features to connect with other gamers</li>
                <li>Secure platform with user-friendly interface</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Our Story</h2>
              <p>
                Crazy Game was founded with a simple vision: to create a platform where gamers can discover, 
                play, and enjoy the best games without any hassle. We started as a small team of gaming enthusiasts 
                and have grown into a community-driven platform that serves thousands of players worldwide.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Join Us</h2>
              <p>
                Whether you're a casual gamer or a hardcore enthusiast, Crazy Game has something for everyone. 
                Join our community today and start your gaming journey with us!
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Games
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
