import React, { useState, useEffect } from 'react'
import FormatList from './FormatList'

const FormatSelect = ({ formatList = [], onDownload, onDownloadMp3 }) => {
    console.log(Date.now())
    const [formatTab, setFormatTab] = useState("video");
    const audioFormats = formatList.filter((item) => item.type.match(/^audio/))
    const videoFormats = formatList.filter((item) => item.type.match(/^video/) && item.audioBitrate)
    const videoOnlyFormats = formatList.filter((item) => item.type.match(/^video/) && !item.audioBitrate)
    //console.log(videoOnlyFormats)
    return (
        <div id="formatSelect">
            <div id="tabSwitch">
                <div onClick={()=>setFormatTab("video")} className={formatTab==="video"?"activeTab":"inactiveTab"}>VIDEO</div>
                <div onClick={()=>setFormatTab("audio")} className={formatTab==="audio"?"activeTab":"inactiveTab"}>AUDIO</div>
                <div onClick={()=>setFormatTab("mp3")} className={formatTab==="mp3"?"activeTab":"inactiveTab"}>MP3</div>
                <div onClick={()=>setFormatTab("videoOnly")} className={formatTab==="videoOnly"?"activeTab":"inactiveTab"}>VIDEO ONLY</div>
            </div>
            <table>
                <thead>
                    <tr id="tableHeader">
                        <th>FORMAT</th>
                        <th>QUALITY</th>
                        <th>LINK</th>
                        <th>DOWNLOAD</th>
                    </tr>
                </thead>

                {formatTab === "video" && <FormatList onDownload={onDownload}  formats={videoFormats} />}
                {formatTab === "audio" && <FormatList onDownload={onDownload}  formats={audioFormats} />}
                {formatTab === "mp3" && <FormatList convertMp3={true} onDownload={onDownloadMp3}  formats={audioFormats} />}
                {formatTab === "videoOnly" && <FormatList onDownload={onDownload} formats={videoOnlyFormats} />}


            </table>
        </div>

    )
}

export default FormatSelect
