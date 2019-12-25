import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';
import {ConfirmDownload, ConfirmDownloadMp3} from './components/ConfirmDownload';


function App() {
  const [video, setVideo]=useState(null);

  return (
    <BrowserRouter>
      <div className="fullSizeContainer borderBox">
        <Navigation />
        <main>
          <Downloader video={video} setVideo={setVideo}/>
          <Route 
            path="/video/:videoUrl/confirm/:itag/:container" 
            render={
              (props)=><ConfirmDownload {...props} video={video} />}
          />
          <Route 
            path="/video/:videoUrl/confirm_mp3/:itag" 
            render={
              (props)=><ConfirmDownloadMp3 {...props} video={video} />}
          />
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
