import React from 'react'
import { Route } from 'react-router-dom'
import Searchbar from './Searchbar'
import VideoCard from './VideoCard'
import VideoView from './VideoView'
import Banner from './Banner'

const getYoutubeID = (url) => {
    /* check if its a valid youtube url and then take the first 11 chars of id and ditch the others */
    const idRegex = /^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}).*/;
    const urlComponents=url.match(idRegex)
    if (urlComponents && urlComponents[4]) {
        return urlComponents[4]
    }
    return false
}

export default ({ video, setVideo, history }) => {
    const onSearchSubmit = (value) => {
        if (value) {
            const ytID=getYoutubeID(value);
            if(ytID)    return history.push(`/video/${ytID}`)
            console.log("not a valid youtube url or id")
        }
    }

    return (
        <div id="downloader" className="inner">
            <Banner />
            {/* youtube url needs to be encoded to be used as param */}
            <Route path={["/video/:query?", "/"]}
                render={({ match }) =>
                    <Searchbar
                        match={match}
                        placeholder="ENTER VIDEO URL"
                        onSubmit={onSearchSubmit}
                    />}
            />
            <Route path="/video/:query" render={(props) => <VideoView video={video} setVideo={setVideo} {...props} />} />
        </div>
    )
}
