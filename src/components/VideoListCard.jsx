import React from "react";
import {Link} from 'react-router-dom'

const VideoListCard = ({ video }) => {
  return (
    <Link to={`/video/${encodeURIComponent(video.link)}`}>
      <div id="videoListCard" className="pointer">
        <img alt="video thumbnail" src={video.thumbnail} />
        <h3>{video.title}</h3>
      </div>
    </Link>
  );
};

export default VideoListCard;
