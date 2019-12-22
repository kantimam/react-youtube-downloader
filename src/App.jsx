import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';
import ConfirmDownload from './components/ConfirmDownload';


function App() {
  return (
    <BrowserRouter>
      <div className="fullSizeContainer borderBox">
        <Navigation />
        <main>
          <Downloader />
          <Route path="/video/:videoUrl/confirm/:selectedFormat" component={ConfirmDownload}/>
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
