import React from 'react'
import VideoListCard from './VideoListCard'

const VideoList = ({videos=[]}) => {
    return (
        <section id="videoList">
            {videos.map(video=><VideoListCard key={Math.random()} video={video}/>)}
        </section>
    )
}

export default VideoList
