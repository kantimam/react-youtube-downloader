import React from 'react'
import {Route} from 'react-router-dom'
import Searchbar from './Searchbar'
import VideoSearch from './VideoSearch'

const YoutubeSearch = ({history, match}) => {
    console.log(match)
    return (
        <div className="inner">
            <Route path="/search/:query?" 
                render={({match})=>
                    <Searchbar 
                        initialValue={match.params.query} 
                        placeholder="SEARCH FOR VIDEO" 
                        onSubmit={(inputVal)=>history.push(`/search/${encodeURIComponent(inputVal)}`)}
                    />}
            />
            <Route path="/search/:query/:page?" component={VideoSearch}/>
        </div>
    )
}

export default YoutubeSearch
