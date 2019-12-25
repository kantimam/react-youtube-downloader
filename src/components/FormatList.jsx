import React from 'react'
import FormatItem from './FormatItem'


const FormatList = ({formats=[], onDownload}) => {
    return (
        <tbody>
            {formats.map((item, index) =>
                <FormatItem onDownload={onDownload} {...item} key={`videoFormat_${index}`} />
            )
            }
        </tbody>
    )
}

export default FormatList
