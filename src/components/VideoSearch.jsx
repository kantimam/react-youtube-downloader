import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import VideoList from './VideoList'
import Loading from './Loading'
import {searchVideo} from '../api/api'

const VideoSearch = ({match}) => {
    const [data, setData]=useState(null)
    const [error, setError]=useState(null)

    useEffect(() => {
        setData(null)
        setError(null)
        searchVideo(match.params.query, 1)
            .catch(error=>{
                console.log(error)
                setError(true)
            })
            .then(json=>setData(json))
    }, [match.params.query])
    
    console.log(data)

    if(error) return <Link to="/search"><h1 className="centerText">SEARCH FAILED!</h1></Link>
    if(data && data.videos.length) {
        return (
            <>
                <VideoList videos={data.videos}/>

                {/* loading additional pages seems to only work once so take it out for now */}
                {/* <h3 onClick={loadMore} className="centerText pointer">MORE!</h3> */}
            </>
        )
    }
    
    return <Loading/>
}

export default VideoSearch
