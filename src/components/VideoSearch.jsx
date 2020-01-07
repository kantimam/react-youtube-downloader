import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import VideoList from './VideoList'
import Loading from './Loading'

const VideoSearch = ({match}) => {
    const [videos, setVideos]=useState(null)
    const [error, setError]=useState(null)
    useEffect(() => {
        setVideos(null)
        setError(null)
        fetch(`http://localhost/search?query=${match.params.query}`)
            .then(response=>{
                console.log(response)
                if(!response.ok) throw Error(response.statusText)
                return response.json();
            })
            .catch(error=>{
                console.log(error)
                setError(true)
            })
            .then(json=>setVideos(json))
        return () => {
        };
    }, [match.params.query])
    

    if(error) return <Link to="/search"><h1 className="centerText">SEARCH FAILED!</h1></Link>
    if(videos && videos.items.length) return <VideoList videos={videos.items}/>
    return <Loading/>
}

export default VideoSearch
