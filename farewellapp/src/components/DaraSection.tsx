import React from 'react';

const DaraSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            💎 Dara's Special Corner 💎
          </h1>
          <p className="text-xl text-white/90">
            Heartfelt messages from Dara
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Coming Soon...
            </h2>
            <p className="text-lg text-white/90">
              Dara is crafting something beautiful for you! 
              <br />
              This space will be filled with appreciation, memories, and warm wishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
              <p className="text-white/80 text-sm">
                Celebrating your amazing journey with us
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">🌈</div>
              <h3 className="text-lg font-semibold text-white mb-2">Wishes</h3>
              <p className="text-white/80 text-sm">
                Best wishes for your next adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaraSection;