import { useState, Suspense } from 'react';
import ShellLanding from './components/ShellLanding';
import FriendSelection from './components/FriendSelection';
import MemoriesGallery from './components/MemoriesGallery';
import MagicCanvas from './components/MagicCanvas';
import SnowflakeCursor from './components/MagicCursor';
import './App.css';

type AppState = 'shell-closed' | 'shell-open' | 'memories-dara' | 'memories-roe';

function App() {
  const [appState, setAppState] = useState<AppState>('shell-closed');

  const renderCurrentState = () => {
    switch (appState) {
      case 'shell-closed':
        return <ShellLanding onCardClick={(friend) => setAppState(friend === 'dara' ? 'memories-dara' : 'memories-roe')} />;
      case 'shell-open':
        return (
          <FriendSelection
            onFriendSelect={(friend) =>
              setAppState(friend === 'dara' ? 'memories-dara' : 'memories-roe')
            }
            onClose={() => setAppState('shell-closed')}
          />
        );
      case 'memories-dara':
        return <MemoriesGallery friend="dara" onBack={() => setAppState('shell-closed')} />;
      case 'memories-roe':
        return <MemoriesGallery friend="roe" onBack={() => setAppState('shell-closed')} />;
      default:
        return <ShellLanding onCardClick={(friend) => setAppState(friend === 'dara' ? 'memories-dara' : 'memories-roe')} />;
    }
  };

  return (
    <div className="app-container">
      <SnowflakeCursor />
      <Suspense fallback={null}>
        <MagicCanvas />
      </Suspense>
      {renderCurrentState()}
    </div>
  );
}

export default App;
