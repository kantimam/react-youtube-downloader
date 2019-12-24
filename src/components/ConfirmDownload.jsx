import React, {useState} from 'react'
import { downloadMp3 } from '../api/api';

const ConfirmDownload = ({initialName, match}) => {
    const [name, setName]=useState();
    const [artist, setArtist]=useState();
    const [song, setSong]=useState();
    console.log(match)
    const download=(event)=>{
        event.preventDefault();
        downloadMp3(match.params.videoUrl)
    }

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm"  onSubmit={download}>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
                <input value={artist} onChange={(e)=>setArtist(e.target.value)} type="text"/>
                <input value={song} onChange={(e)=>setSong(e.target.value)} type="text"/>
                <input className="submit" value="DOWNLOAD" type="submit"/>
            </form>
        </div>
    )
}

export default ConfirmDownload