import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';
import YoutubeSearch from './components/YoutubeSearch';

import {ConfirmDownload, ConfirmDownloadMp3} from './components/ConfirmDownload';


function App() {
  const [video, setVideo]=useState(null);

  return (
    <BrowserRouter>
      <div className="fullSizeContainer borderBox">
        <Navigation />
        <main>
          <Switch>
            <Route path="/search" component={YoutubeSearch}/>
            <Route path="/" render={({history})=><Downloader history={history} video={video} setVideo={setVideo}/>}/>
          </Switch>
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
