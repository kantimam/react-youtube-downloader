import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';

function App() {
  return (
    <BrowserRouter>
      <div className="fullSizeContainer borderBox">
        <Navigation />
        <main>
          <Downloader />
          <div id="test"></div>
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
