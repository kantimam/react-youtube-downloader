import React, { useState, useEffect } from 'react'
import { downloadMp3, downloadMp3Fast, getFileSize } from '../api/api';
import CloseIcon from './CloseIcon';
import Progress from './Progress';

const ConfirmDownloadMp3 = ({ match, video, history }) => {
    const [downloadState, setDownload] = useState("download");
    const [name, setName] = useState("");

    const [metadata, setMeta] = useState(0);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);

    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");

    const [allowFast, setFast]=useState(false);

    const download = (event) => {
        event.preventDefault();
        if(downloadState==="download"){
            /* if file is more than 500mb download video directly and dont store it in memory before */
            if(false){
                /* download video directly */
                return close();
            }
            
            if(!allowFast){
                setDownload("loading")
                const cover=video && video.thumbnail
                return downloadMp3(
                    match.params.query, 
                    match.params.itag, 
                    name,
                    metadata, 
                    {title: song, artist: artist, cover: cover}, 
                    (loaded)=>setProgress(loaded), 
                    (state)=>setDownload(state)
                );
            } 
            return downloadMp3Fast(
                match.params.query, 
                match.params.itag, 
                name,
                metadata, 
                {title: song, artist: artist}, 
                (loaded)=>setProgress(loaded), 
                (state)=>setDownload(state)
            );

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

    useEffect(() => {
        reset();
        if (video) setName(video.title)
        getFileSize(match.params.query, match.params.itag).then(response => {
            /* disabled button while waiting */
            setMeta(response.data)
        }).catch(e => {
            /* enable when failed or succes */
            console.log(e);
            setError("failed to get videoinfo... you can try download anyway")
        });
    }, [video, match.params.query, match.params.itag])


    const generateMp3Tags=(event)=>{
        event.preventDefault();
        if(video.title){
            const parts=video.title.split("-");
            if(parts.length===2){
                setArtist(parts[0].trim());
                setSong(parts[1].trim());
            }
        }
    }

    const close=()=>{
        history.push(`/video/${match.params.query}`)
    }


    if (!video) return <div id="confirmModal" className="centerAll"><h1>LOADING</h1></div>

    return (
        <div id="confirmModal" className="centerAll">
            <form id="customNameForm" onSubmit={download}>
                <CloseIcon onClick={close} />
                <h1 className="centerText">CONFIRM DOWNLOAD</h1>
                {metadata && <Progress size={metadata.size} progress={progress} />}
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                
                <button onClick={generateMp3Tags} id="autoMp3Button" className="marginAuto">AUTO GENERATE</button>
                
                <input value={artist} placeholder="add an artist if you want" onChange={(e) => setArtist(e.target.value)} type="text" />
                <input value={song} placeholder="add song name" onChange={(e) => setSong(e.target.value)} type="text" />
                <input className="submit hoverShadow" value={downloadState} type="submit" disabled={false}/>
            </form>
        </div>
    )
}

export default ConfirmDownloadMp3