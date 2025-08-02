import { useState } from 'react'
import Sidebar from './components/Sidebar'
import LandingPage from './components/LandingPage'
import RoeSection from './components/RoeSection'
import DaraSection from './components/DaraSection'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState<'landing' | 'roe' | 'dara'>('landing')

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'roe':
        return <RoeSection />
      case 'dara':
        return <DaraSection />
      default:
        return <LandingPage />
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        onSectionChange={setCurrentSection} 
        currentSection={currentSection} 
      />
      <main className="flex-1 ml-64 transition-all duration-300">
        {renderCurrentSection()}
      </main>
    </div>
  )
}

export default App
