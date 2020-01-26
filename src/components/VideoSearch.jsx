import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VideoList from './VideoList'
import Loading from './Loading'
import { searchVideo } from '../api/api'
import usePrevious from './usePrevious'

// api sometimes gives overlapping videos so filter out videos that are already in array (a)
const removeDouble = (a, b) => {
    for (let i = b.length - 1; i >= 0; i--) {
        for (let j = 0; j < a.length; j++) {
            if (a[j].link === b[i].link) {
                b.splice(i, 1);
                break;
            }
        }
    }
    return b;
}

const loadedPages = new Set()

const VideoSearch = ({ match, history }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const prevPage = usePrevious(match.params.page || 1);
    const prevQuery= usePrevious(match.params.query);

    useEffect(() => {
        /* if the page changes: check if we still search for the same term (query) and if we dont already have this page then load more videos :)*/
        if (prevQuery===match.params.query && 
            !loadedPages.has(match.params.page)
            ) {
            
            setError(null)
            searchVideo(match.params.query, match.params.page)
                .catch(error => {
                    console.log(error)
                    setError(true)
                })
                .then(json => {
                    loadedPages.add(match.params.page)
                    if (prevPage > match.params.page) {
                        //console.log("loading prev")
                        return setData({ ...json, videos: [...removeDouble(data.videos, json.videos), ...data.videos] })
                    } 
                        //console.log("loading next")
                        setData({ ...json, videos: [...data.videos, ...removeDouble(data.videos, json.videos)] })
                    
                })
        }
    }, [match.params.page])


    useEffect(() => {
        setError(null)
        searchVideo(match.params.query, match.params.page)
            .catch(error => {
                console.log(error)
                setError(true)
            })
            .then(json => {
                loadedPages.add(match.params.page)
                setData(json)
            })
        
        return () => {
            loadedPages.clear();
        };
    }, [match.params.query])



    if (error) return <Link to="/search"><h1 className="centerText errorMessage">SEARCH FAILED!</h1></Link>
    if (data && data.videos.length) {
        return (
            <>
                <VideoList videos={data.videos} />

                {/* loading additional pages seems to only work once so take it out for now */}
                <PageNav page={match.params.page} query={match.params.query}/>

            </>
        )
    }

    return <Loading />
}

const PageNav = ({ page=1, query }) => {
    return (
        <div id="pageNavContainer">
            {page > 1 &&
                <Link to={`/search/${query}/${Number(page) - 1}`} className="undecoratedLink centerText">
                    <h3 id="videoSearchNav" >PREV</h3>
                </Link>
            }
            <Link to={`/search/${query}/${Number(page) + 1}`} className="undecoratedLink centerText">
                <h3 id="videoSearchNav" >NEXT</h3>
            </Link>
        </div>
    )
}


export default VideoSearch
