import React, {useState} from 'react'
import FormatItem from './FormatItem'

const FormatSelect = ({ formatList = [] }) => {
    const [formatTab, setFormatTab]=useState("video");
    const audioFormats=formatList.filter((item)=>item.type.match(/^audio/))
    const videoFormats=formatList.filter((item)=>item.type.match(/^video/))
    return (
        <table id="formatSelect">
            <thead>
                <tr id="tableHeader">
                    <th>FORMAT</th>
                    <th>QUALITY</th>
                    <th>LINK</th>
                    <th>DOWNLOAD</th>
                </tr>
            </thead>
            
            {formatTab==="video"?
            <tbody>
                {videoFormats.map((item, index) => 
                    <FormatItem {...item} key={`videoFormat_${index}`} />
                )
                }
            </tbody>:
            <tbody>
                {videoFormats.map((item, index) => 
                    <FormatItem {...item} key={`videoFormat_${index}`} />
                )
                }
            </tbody>}
        </table>
    )
}

export default FormatSelect
