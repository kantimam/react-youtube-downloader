import React, {useState, useEffect} from 'react'

const Searchbar = ({onSubmit, placeholder="SEARCH FOR YOUTUBE URL", match}) => {
    const [inputVal, setInputVal]=useState("")
    useEffect(() => {
        if(match.params.query) setInputVal(decodeURIComponent(match.params.query));
        else setInputVal("");
    }, [match.params.query])
    return (
        <form 
            onSubmit={(event) => {
                    event.preventDefault(); 
                    onSubmit(inputVal);
                }
            } 
            id="searchbar" 
            className="margin0Auto"
        >
            <input value={inputVal} onChange={(event)=>setInputVal(event.target.value)} placeholder={placeholder} type="text" id="searchText" required />
            <input type="submit" value="SEARCH" id="searchSubmit" />
        </form>
    )
}

export default Searchbar
