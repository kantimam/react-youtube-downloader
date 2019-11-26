import React, {useEffect, useState} from 'react'
import {getVideoData} from '../api/api.js'
import Loading from './Loading'

const VideoView = ({match}) => {
    const [video, setVideo]=useState(null);
    const [error, setError]=useState(null);
    const videoUrl=match.params.videoUrl;
    useEffect(() => {
        setVideo(null);
        setError(null);
        getVideoData(videoUrl).then(data=>setVideo(data)).catch(error=>setError(true));
    }, [videoUrl])

    if(error) return <div id="error">error</div>
    if(!video) return <Loading/>
    return (
        <div>
            SUCCES
            {JSON.stringify(video)}
        </div>
    )
}

export default VideoView
