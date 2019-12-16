import React, {useState} from 'react'

export const ConfirmDownload = ({initialName}) => {
    const [name, setName]=useState();
    const [artist, setArtist]=useState();
    const [song, setSong]=useState();
    return (
        <div className="fullPageAbsolute centerAll">
            <form id="customNameForm" onSubmit={()=>console.log("downlading")}>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
                <input value={artist} onChange={(e)=>setArtist(e.target.value)} type="text"/>
                <input value={song} onChange={(e)=>setSong(e.target.value)} type="text"/>
                <input value="DOWNLOAD" type="submit"/>
            </form>
        </div>
    )
}
