import React, { useState } from 'react';

interface SidebarProps {
  onSectionChange: (section: 'landing' | 'roe' | 'dara') => void;
  currentSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionChange, currentSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'landing',
      label: 'Home',
      icon: '🏠',
      description: 'Back to the chaos'
    },
    {
      id: 'roe',
      label: 'Roe\'s Corner',
      icon: '🌟',
      description: 'Roe\'s special tribute'
    },
    {
      id: 'dara',
      label: 'Dara\'s Corner',
      icon: '💎',
      description: 'Dara\'s heartfelt messages'
    }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-slate-700 hover:bg-slate-600 rounded-full p-2 transition-colors duration-200"
      >
        <span className="text-sm">
          {isCollapsed ? '▶️' : '◀️'}
        </span>
      </button>

      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        {!isCollapsed ? (
          <div>
            <h2 className="text-xl font-bold mb-2">💝 Farewell Journey</h2>
            <p className="text-slate-300 text-sm">Choose your adventure!</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-2xl">💝</div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id as 'landing' | 'roe' | 'dara')}
            className={`w-full p-4 text-left hover:bg-slate-800 transition-colors duration-200 ${
              currentSection === item.id ? 'bg-slate-800 border-r-4 border-purple-500' : ''
            }`}
          >
            {!isCollapsed ? (
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                <p className="text-slate-400 text-xs ml-8">{item.description}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-xl">{item.icon}</div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎭</div>
            <p className="text-xs text-slate-300">
              Made with lots of love <br />
              (and probably too much coffee ☕)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;