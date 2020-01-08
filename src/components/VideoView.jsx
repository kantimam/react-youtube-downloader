import React, {useEffect, useState} from 'react'
import {getVideoData} from '../api/api.js'
import Loading from './Loading'
import VideoCard from './VideoCard'
import FormatSelect from './FormatSelect.jsx'

const VideoView = ({match, history, video, setVideo}) => {
    console.log(history)
    const [error, setError]=useState(null);
    const query=match.params.query;
    useEffect(() => {
        setVideo(null);
        setError(null);
        getVideoData(query).then(data=>setVideo(data)).catch(error=>setError(true));
    }, [query])

    const onDownload=(itag, container)=>{
        if(video.title && itag && container){
            history.push(`/video/${query}/confirm/${itag}/${container}`)
        }
    }
    const onDownloadMp3=(itag)=>{
        if(video.title && itag){
            history.push(`/video/${query}/confirm_mp3/${itag}`)
        }
    }


    if(error) return <div id="error">error</div>
    if(!video) return <Loading/>
    return (
        <div id="videoView">
            <VideoCard thumbnail={video.thumbnail} title={video.title} length={video.length}/>
            <FormatSelect onDownload={onDownload} onDownloadMp3={onDownloadMp3} formatList={video.formats}/>
        </div>
    )
}

export default VideoView
