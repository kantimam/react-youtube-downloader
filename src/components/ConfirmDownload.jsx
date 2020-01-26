import React, { useState, useEffect } from 'react'
import { downloadMp3, downloadVideo, getFileSize } from '../api/api';
import CloseIcon from './CloseIcon';
import Progress from './Progress';

export const ConfirmDownload = ({ match, video, history }) => {
    const [downloadState, setDownload] = useState("download");
    const [name, setName] = useState("");

    const [metadata, setMeta] = useState(0);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);

    const download = async (event) => {
        event.preventDefault();
        if(downloadState==="download"){
            setDownload("loading")
            await downloadVideo(match.params.query, match.params.itag, name, metadata, (loaded)=>setProgress(loaded), ()=>setDownload("finished"))
        }

    }
    const reset=()=>{
        setMeta(null);
        setProgress(0);
        setError("");
        setDownload("download");
    }
    useEffect(() => {
        reset()
        if (video) setName(video.title)
        getFileSize(match.params.query, match.params.itag).then(response => {
            setMeta(response.data);
        }).catch(e => {
            console.log(e);
            setError("failed to get videoinfo... you can try download anyway")
        });
    }, [video, match.params.query, match.params.itag, match.params.container])

    if (!video) return <div id="confirmModal" className="centerAll"><h1>LOADING</h1></div>

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm" onSubmit={download}>
                <CloseIcon onClick={() => history.push(`/video/${match.params.query}`)} />
                <h1 className="centerText">CONFIRM DOWNLOAD</h1>
                {metadata && <Progress size={metadata.size} progress={progress} />}
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                <input className="submit hoverShadow" value={downloadState} type="submit" />
            </form>
        </div>
    )
}




export const ConfirmDownloadMp3 = ({ match, video, history }) => {
    const [downloadState, setDownload] = useState(null);
    const [name, setName] = useState("");

    const [metadata, setMeta] = useState(0);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);

    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");

    const download = async (event) => {
        event.preventDefault();
        if(downloadState==="download"){
            setDownload("loading")
            await downloadMp3(match.params.query, match.params.itag, name, artist, song, metadata, (loaded)=>setProgress(loaded), ()=>setDownload("finished"));
            setDownload("finished")
        }
    }
    const reset=()=>{
        setMeta(null);
        setProgress(0);
        setError("");
        setDownload("download");
    }

    useEffect(() => {
        reset();
        if (video) setName(video.title)
        getFileSize(match.params.query, match.params.itag).then(response => {
            setMeta(response.data)
        }).catch(e => {
            console.log(e);
            setError("failed to get videoinfo... you can try download anyway")
        });
    }, [video, match.params.query, match.params.itag])

    if (!video) return <div id="confirmModal" className="centerAll"><h1>LOADING</h1></div>

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm" onSubmit={download}>
                <CloseIcon onClick={() => history.push(`/video/${match.params.query}`)} />
                <h1 className="centerText">CONFIRM DOWNLOAD</h1>
                {metadata && <Progress size={metadata.size} progress={progress} />}
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                <input value={artist} placeholder="add an artist if you want" onChange={(e) => setArtist(e.target.value)} type="text" />
                <input value={song} placeholder="add song name" onChange={(e) => setSong(e.target.value)} type="text" />
                <input className="submit hoverShadow" value={downloadState} type="submit" />
            </form>
        </div>
    )
}

