import React from "react";
import {Link} from 'react-router-dom'

const VideoListCard = ({ video }) => {
  const videoID=video && video.link? video.link.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)[1] : "";
  return (
    <Link to={`/video/${videoID}`}>
      <div id="videoListCard" className="pointer">
        <img alt="video thumbnail" src={video.thumbnail} />
        <h3>{video.title}</h3>
      </div>
    </Link>
  );
};

export default VideoListCard;
