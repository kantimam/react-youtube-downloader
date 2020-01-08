import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import VideoList from './VideoList'
import Loading from './Loading'
import {searchVideo} from '../api/api'

const VideoSearch = ({match}) => {
    const [videos, setVideos]=useState(null)
    const [error, setError]=useState(null)

    const initialLoad=()=>{
        searchVideo(match.params.query, 20)
            .catch(error=>{
                console.log(error)
                setError(true)
            })
            .then(json=>setVideos(json))
    }

    /* loading more videos from ref does seem to be bugger after the first one so not worth it
    const loadMore=()=>{
        if(videos.nextpageRef){
            searchVideo(videos.nextpageRef)
            .catch(error=>{
                console.log(error)
                setError(true)
            })
            .then(json=>{
                setVideos({...json, items: [...videos.items, ...json.items]})
            })
        }
    } */
    useEffect(() => {
        setVideos(null)
        setError(null)
        initialLoad();
        return () => {
        };
    }, [match.params.query])
    
    console.log(videos)

    if(error) return <Link to="/search"><h1 className="centerText">SEARCH FAILED!</h1></Link>
    if(videos && videos.items.length) {
        return (
            <>
                <VideoList videos={videos.items}/>

                {/* loading additional pages seems to only work once so take it out for now */}
                {/* <h3 onClick={loadMore} className="centerText pointer">MORE!</h3> */}
            </>
        )
    }
    
    return <Loading/>
}

export default VideoSearch
