import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';

function App() {
  return (
    <div className="fullSizeContainer borderBox">
      <Navigation/>
      <main>
        <Downloader/>
        <div id="test"></div>
      </main>
    </div>
  );
}

export default App;
