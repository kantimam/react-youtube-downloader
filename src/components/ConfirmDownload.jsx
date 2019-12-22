import React, {useState} from 'react'

const ConfirmDownload = ({initialName, match}) => {
    const [name, setName]=useState();
    const [artist, setArtist]=useState();
    const [song, setSong]=useState();
    /* const {videoUrl, selectedFormat}=match.params; */
    console.log(match)

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm" onSubmit={()=>console.log("downlading")}>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
                <input value={artist} onChange={(e)=>setArtist(e.target.value)} type="text"/>
                <input value={song} onChange={(e)=>setSong(e.target.value)} type="text"/>
                <input className="submit" value="DOWNLOAD" type="submit"/>
            </form>
        </div>
    )
}

export default ConfirmDownload