import React from 'react'
import {Route} from 'react-router-dom'
import Searchbar from './Searchbar'
import VideoCard from './VideoCard'
import VideoView from './VideoView'

export default () => {
    return (
        <div id="downloader" className="inner">
            <Searchbar/>
            <Route path="/video/:videoUrl" component={VideoView}/>
        </div>
    )
}
