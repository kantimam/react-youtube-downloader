import React, {useState, useEffect} from 'react'
import VideoList from './VideoList'

const VideoSearch = ({history, location}) => {
    const [videos, setVideos]=useState([])
    useEffect(() => {
        return () => {
        };
    }, [])
    return (
        <VideoList videos={videos}/>
    )
}

export default VideoSearch
