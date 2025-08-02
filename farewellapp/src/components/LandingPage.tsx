import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 animate-bounce">
            🎉 SURPRISE! 🎉
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Welcome to Your Farewell Adventure!
          </h2>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="text-8xl mb-4">🤪</div>
          <p className="text-xl text-white font-medium mb-4">
            Before we get all emotional and stuff...
          </p>
          <p className="text-lg text-white/90">
            We made this little corner of the internet just for you! 
            <br />
            (Yes, we're that extra 💅)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="text-4xl mb-3">🎭</div>
            <h3 className="font-bold text-lg mb-2">Comedy Central</h3>
            <p className="text-sm">Memes, jokes, and embarrassing memories</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="text-4xl mb-3">💝</div>
            <h3 className="font-bold text-lg mb-2">The Feels Corner</h3>
            <p className="text-sm">Heartfelt messages and nostalgic moments</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-bold text-lg mb-2">Your Next Chapter</h3>
            <p className="text-sm">Because you're destined for greatness!</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-white/80 text-sm">
            👈 Check out the sidebar to explore our masterpiece!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;