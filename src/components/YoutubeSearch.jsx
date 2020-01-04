import React from 'react'
import Searchbar from './Searchbar'

const YoutubeSearch = ({history}) => {
    return (
        <div className="inner">
            <Searchbar onSubmit={inputVal=>console.log(inputVal)}/>
        </div>
    )
}

export default YoutubeSearch
