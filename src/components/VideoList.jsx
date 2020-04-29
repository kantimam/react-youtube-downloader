import React from 'react'
import VideoListCard from './VideoListCard'

const VideoList = ({videos=[]}) => {
    return (
        <section id="videoList">
            {videos.map((video, index)=><VideoListCard key={video.link+"_"+index} video={video}/>)}
        </section>
    )
}

export default VideoList
