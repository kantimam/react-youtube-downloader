import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';

function App() {
  return (
    <div className="fullSizeContainer flexColumn overflowHidden">
      <Navigation/>
      <main className="flex1 overflowAuto">
        <Downloader/>
      </main>
    </div>
  );
}

export default App;
