import React from 'react'
import {Route} from 'react-router-dom'
import Searchbar from './Searchbar'
import VideoCard from './VideoCard'
import VideoView from './VideoView'
import Banner from './Banner'

export default ({video, setVideo, history}) => {
    return (
        <div id="downloader" className="inner">
            <Banner/>
            {/* youtube url needs to be encoded to be used as param */}
            <Searchbar onSubmit={(inputVal)=>history.push(`/video/${encodeURIComponent(inputVal)}`)}/>
            <Route path="/video/:videoUrl" render={(props)=><VideoView video={video} setVideo={setVideo} {...props}/>}/>
        </div>
    )
}
