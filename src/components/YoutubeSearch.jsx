import React from 'react'
import { Route } from 'react-router-dom'
import Searchbar from './Searchbar'
import VideoSearch from './VideoSearch'
import Banner from './Banner'


const YoutubeSearch = ({ history, match }) => {
    //console.log(match)
    return (
        <div className="inner">
            <Banner text="YOUTUBE COON <SEARCH>"/>
            <Route path="/search/:query?"
                render={({ match }) =>
                    <Searchbar
                        match={match}
                        placeholder="SEARCH FOR VIDEO"
                        onSubmit={(inputVal) => history.push(`/search/${encodeURIComponent(inputVal)}/1`)}
                    />}
            />
            <Route path="/search/:query/:page?" component={VideoSearch} />
        </div>
    )
}

export default YoutubeSearch
