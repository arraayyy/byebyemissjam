import { useState, Suspense } from 'react';
import ShellLanding from './components/ShellLanding';
import MemoriesGallery from './components/MemoriesGallery';
import MagicCanvas from './components/MagicCanvas';
import SnowflakeCursor from './components/MagicCursor';
import './App.css';

type AppState = 'landing' | 'memories-dara' | 'memories-roe';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  const renderCurrentState = () => {
    switch (appState) {
      case 'landing':
        return <ShellLanding onCardClick={(friend) => setAppState(friend === 'dara' ? 'memories-dara' : 'memories-roe')} />;
      case 'memories-dara':
        return <MemoriesGallery friend="dara" onBack={() => setAppState('landing')} />;
      case 'memories-roe':
        return <MemoriesGallery friend="roe" onBack={() => setAppState('landing')} />;
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