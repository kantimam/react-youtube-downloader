import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import { redirectIfValid } from './components/util';
import PageLoading from './components/PageLoading';

const ConfirmDownload=lazy(()=>import('./components/ConfirmDownload'));
const ConfirmDownloadMp3=lazy(()=>import('./components/ConfirmDownloadMp3'));
const YoutubeSearch=lazy(()=>import('./components/YoutubeSearch'));
const Downloader=lazy(()=>import('./components/Downloader'));



function App() {
  const [video, setVideo] = useState(null);
  const [appHeight, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    })
    return () => {
      window.removeEventListener(resizeListener);
    };
  }, [])

  return (
    <BrowserRouter>
      {/* handle mobile browser bullshit */}
      <div style={{ minHeight: `${appHeight}px` }} className="fullSizeContainer borderBox">
        <Suspense fallback={PageLoading}>
          <Navigation />
          <main>
            <Switch>
              {/* route to share youtube urls from other android apps (youtube for example <3) only works on adroid for now :(  */}
              <Route path="/share" render={({ history }) => redirectIfValid(history)} />

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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
