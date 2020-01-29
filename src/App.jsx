import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import Downloader from './components/Downloader';
import YoutubeSearch from './components/YoutubeSearch';
import Banner from './components/Banner'

import { ConfirmDownload, ConfirmDownloadMp3 } from './components/ConfirmDownload';


function App() {
  const [video, setVideo] = useState(null);

  return (
    <BrowserRouter>
      <div className="fullSizeContainer borderBox">
        <Navigation />
        <main>
          <Switch>
            <Route path="/search" component={YoutubeSearch} />
            <Route path="/" render={({ history }) => <Downloader history={history} video={video} setVideo={setVideo} />} />
          </Switch>
          <Route
            path="/video/:query/confirm/:itag"
            render={
              (props) => <ConfirmDownload {...props} video={video} />}
          />
          <Route
            path="/video/:query/confirm_mp3/:itag"
            render={
              (props) => <ConfirmDownloadMp3 {...props} video={video} />}
          />
        </main>
        <footer className="centerText">
          <p>
            found a bug or have a question?  
          </p>
          <a href="mailto:kantemir.imam@gmail.com">{"<Contact!>"}</a>
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
