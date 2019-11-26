import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Searchbar = () => {
    const { push } = useHistory();
    const [inputVal, setInputVal]=useState("")
    return (
        <form 
            onSubmit={(event) => {
                    event.preventDefault(); 
                    /* youtube url needs to be encoded to be used as param */
                    push(`/video/${encodeURIComponent(inputVal)}`);
                }
            } 
            id="searchbar" 
            className="margin0Auto"
        >
            <input value={inputVal} onChange={(event)=>setInputVal(event.target.value)} placeholder="SEARCH FOR YOUTUBE URL" type="text" id="searchText" required />
            <input type="submit" value="SEARCH" id="searchSubmit" />
        </form>
    )
}

export default Searchbar
