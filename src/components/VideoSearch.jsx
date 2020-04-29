import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VideoList from './VideoList'
import Loading from './Loading'
import { searchVideo } from '../api/api'
import usePrevious from './usePrevious'

// api sometimes gives overlapping videos so filter out videos that are already in array (a)
const removeDouble = (a, b) => {
    const bLen=b.length;
    const aLen=a.length;
    for (let i = bLen - 1; i >= 0; i--) {
        for (let j = 0; j < aLen; j++) {
            if (a[j].link === b[i].link) {
                b.splice(i, 1);
                break;
            }
        }
    }
    return b;
}

/* const removeDoubleSelf=(a)=>{
    const aLen=a.length;
    for(let i=aLen; i>0; i--){
        for(let j=i-1; j>=0; j--){
            if(a[i].link===a[j].link){
                a.splice(j, 1);
            }
        }
    }
    return a;
} */

const loadedPages = new Set()

const VideoSearch = ({ match, history, location }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const prevPage = usePrevious(match.params.page || 1);
    const prevQuery= usePrevious(match.params.query);

    useEffect(() => {
        /* load extra pages */
        /* if the page changes: check if we still search for the same term (query) and if we dont already have this page then load more videos :)*/
        if (prevQuery===match.params.query && 
            !loadedPages.has(match.params.page)
            ) {
            /* console.log("load extra pages") */
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


    /* add another hook that fires when url didnt actually change but forceRefresh state is set so stale data can be replaced */
    useEffect(() => {
        /* console.log(location.state); */
        const currentPage=match.params.page || 1;
        /* only refresh if page and query is the same just another state was set to force a rerender */
        if(prevQuery===match.params.query && currentPage===prevPage){
            /* console.log("reload stuff") */
            searchVideo(match.params.query, match.params.page)
            .catch(error => {
                console.log(error)
                setError(true)
            })
            .then(json => {
                
                if(!json || !json.videos || !Array.isArray(json.videos)) return console.log("no data received");
                loadedPages.add(match.params.page)
                /* if the requested data has more entries just replace the state */
                if(!data.length || json.length>data.length) return setData(json)
                
                /* else if the requested data is most likely inside the state or at least a part of it splice the new data into it */
                const videoState=[...data]
                const firstId=videoState.findIndex(item=>item.link===json[0].link) || 0;
                const lastId=videoState.findIndex(item=>item.link===json[json.length-1].link) || 0;

                videoState.splice(firstId, lastId-firstId, ...json);
                setData(videoState);
            })
        }
    }, [location.state])


    useEffect(() => {
        /* load initial data */
        /* console.log("initial data load") */
        setError(null)
        searchVideo(match.params.query, match.params.page)
            .catch(error => {
                console.log(error)
                setError(true)
            })
            .then(json => {
                loadedPages.clear();
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
