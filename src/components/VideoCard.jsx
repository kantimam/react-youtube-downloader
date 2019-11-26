import React from 'react'

const VideoCard = ({ thumbnail, title, length }) => {
    return (
        <div id="videoCard">
            <img src={thumbnail} alt="video thumbnail" />
            <h3>{title}</h3>
            <p>duration: <strong>{length ? (length / 60).toFixed(2) : 0} minutes</strong></p>
            <div></div>
        </div>
    )
}

export default VideoCard
