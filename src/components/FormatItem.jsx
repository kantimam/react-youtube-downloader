import React from 'react'



const FormatItem = ({container, type, audioBitrate, qualityLabel, url, itag, onDownload }) => {
    return (
        <tr id="formatItem">
            <td id="format">{type}</td>
            <td id="quality">{qualityLabel? qualityLabel : audioBitrate+" bitrate"}</td>
            <td className="centerText">
                <a href={url}>
                    SOURCE
                </a>
            </td>
            <td className="pointer">
                <div onClick={()=>onDownload(itag, container)} id="download">
                    DOWNLOAD
                </div> 
            </td>
        </tr>
    )
}

export default FormatItem
