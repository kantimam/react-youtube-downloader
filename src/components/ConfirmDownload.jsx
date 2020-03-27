import React, { useState, useEffect } from 'react'
import { downloadVideo, getFileSize } from '../api/api';
import CloseIcon from './CloseIcon';
import Progress from './Progress';

const ConfirmDownload = ({ match, video, history }) => {
    const [downloadState, setDownload] = useState("download");
    const [name, setName] = useState("");

    const [metadata, setMeta] = useState(0);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);

    const download = (event) => {
        event.preventDefault();
        if(downloadState==="download"){
            /* if file is more than 500mb download video directly and dont store it in memory before */
            if(false){
                /* download video directly */
                return close();
            }
            setDownload("loading")
            return downloadVideo(match.params.query, match.params.itag, name, metadata, (loaded)=>setProgress(loaded), (state)=>setDownload(state))
        }
        if(downloadState==="failed :("){
            return reset();
        }
        if(downloadState==="finished"){
            return close();
        }

    }
    const reset=()=>{
        setMeta(null);
        setProgress(0);
        setError("");
        setDownload("download");
    }

    const close=()=>{
        history.push(`/video/${match.params.query}`)
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
    }, [video, match.params.query, match.params.itag])

    if (!video) return <div id="confirmModal" className="centerAll"><h1>LOADING</h1></div>

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm" onSubmit={download}>
                <CloseIcon onClick={close} />
                <h1 className="centerText">CONFIRM DOWNLOAD</h1>
                {metadata && <Progress size={metadata.size} progress={progress} />}
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                <input className="submit hoverShadow" value={downloadState} type="submit" />
            </form>
        </div>
    )
}


export default ConfirmDownload