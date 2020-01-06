import React from 'react'
import {Route} from 'react-router-dom'
import Searchbar from './Searchbar'
import VideoSearch from './VideoSearch'

const YoutubeSearch = ({history}) => {
    return (
        <div className="inner">
            <Searchbar placeholder="SEARCH FOR VIDEO" onSubmit={inputVal=>console.log(inputVal)}/>
            <Route path="/search/:query/:page" component={VideoSearch}/>
        </div>
    )
}

export default YoutubeSearch
