import React, {useState, useEffect} from 'react'
import { downloadMp3, downloadVideo } from '../api/api';

export const ConfirmDownload = ({match, video}) => {
    const [downloadState, setDownload]=useState(null);
    const [name, setName]=useState("");
    const download=async (event)=>{
        event.preventDefault();
        setDownload("requested")
        await downloadVideo(match.params.videoUrl, match.params.itag, name, match.params.container)
        setDownload("finished")
    }
    useEffect(() => {
        if(video) setName(video.title)
    }, [video, match.params.videoUrl, match.params.itag], match.params.container)

    if(!video) return <div id="confirmModal" className="centerAll"><h1>LOADING</h1></div>

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm"  onSubmit={download}>
                <h1 className="centerText">CONFIRM DOWNLOAD</h1>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
                <input className="submit hoverShadow" value="DOWNLOAD" type="submit"/>
            </form>
        </div>
    )
}

export const ConfirmDownloadMp3 = ({match, video}) => {
    const [downloadState, setDownload]=useState(null);
    const [name, setName]=useState("");
    const [artist, setArtist]=useState("");
    const [song, setSong]=useState("");
    const download=async (event)=>{
        event.preventDefault();
        setDownload("requested")
        await downloadMp3(match.params.videoUrl, match.params.itag, name, artist, song);
        setDownload("finished")
    }
    useEffect(() => {
        if(video) setName(video.title)
    }, [video, match.params.videoUrl, match.params.itag])

    if(!video) return <div id="confirmModal" className="centerAll"><h1>LOADING</h1></div>

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm"  onSubmit={download}>
                <h1 className="centerText">CONFIRM DOWNLOAD</h1>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
                <input value={artist} placeholder="add an artist if you want" onChange={(e)=>setArtist(e.target.value)} type="text"/>
                <input value={song} placeholder="add song name" onChange={(e)=>setSong(e.target.value)} type="text"/>
                <input className="submit hoverShadow" value="DOWNLOAD" type="submit"/>
            </form>
        </div>
    )
}

