import React, { useState, useEffect } from 'react'
import FormatList from './FormatList'

const FormatSelect = ({ formatList = [] }) => {
    console.log(Date.now())
    const [formatTab, setFormatTab] = useState("video");
    const audioFormats = formatList.filter((item) => item.type.match(/^audio/))
    const videoFormats = formatList.filter((item) => item.type.match(/^video/) && !item.videoOnly)
    const videoOnlyFormats = formatList.filter((item) => item.type.match(/^video/) && item.videoOnly)
    return (
        <div id="formatSelect">
            <div id="tabSwitch">
                <div onClick={()=>setFormatTab("video")} className={formatTab==="video"?"activeTab":"inactiveTab"}>AUDIO</div>
                <div onClick={()=>setFormatTab("audio")} className={formatTab==="audio"?"activeTab":"inactiveTab"}>VIDEO</div>
                <div onClick={()=>setFormatTab("videoOnly")} className={formatTab==="videoOnly"?"activeTab":"inactiveTab"}>AUDIO ONLY</div>
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

                {formatTab === "video" && <FormatList formats={videoFormats} />}
                {formatTab === "audio" && <FormatList formats={audioFormats} />}
                {formatTab === "videoOnly" && <FormatList formats={videoOnlyFormats} />}


            </table>
        </div>

    )
}

export default FormatSelect
