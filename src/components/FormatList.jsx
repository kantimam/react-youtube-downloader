import React from 'react'
import FormatItem from './FormatItem'


const FormatList = ({formats=[], onDownload, convertMp3}) => {
    return (
        <tbody>
            {formats.map((item, index) =>
                <FormatItem onDownload={onDownload}  {...item} type={convertMp3? "mp3": item.type} key={`videoFormat_${index}`} />
            )
            }
        </tbody>
    )
}

export default FormatList
