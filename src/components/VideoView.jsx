import React, {useEffect, useState} from 'react'
import {getVideoData} from '../api/api.js'
import Loading from './Loading'
import VideoCard from './VideoCard'
import FormatSelect from './FormatSelect.jsx'

const VideoView = ({match}) => {
    const [video, setVideo]=useState(null);
    const [error, setError]=useState(null);
    const videoUrl=match.params.videoUrl;
    useEffect(() => {
        setVideo(null);
        setError(null);
        getVideoData(videoUrl).then(data=>setVideo(data)).catch(error=>setError(true));
    }, [videoUrl])

    console.log(video)

    if(error) return <div id="error">error</div>
    if(!video) return <Loading/>
    return (
        <div id="videoView" className="inner">
            <VideoCard thumbnail={video.thumbnail} title={video.title} length={video.length}/>
            <FormatSelect formatList={video.formats}/>
        </div>
    )
}

export default VideoView