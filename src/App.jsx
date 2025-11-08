import React from 'react';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import Dashboard from './components/Dashboard';
import PlayerWithChat from './components/PlayerWithChat';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0f1226] font-inter antialiased">
      <Hero />
      <Dashboard />
      <UploadSection />
      <PlayerWithChat />
      <Footer />
    </div>
  );
}

export default App;
