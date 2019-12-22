import React from 'react'
import FormatItem from './FormatItem'


const FormatList = ({formats=[], formatType, onDownload}) => {
    return (
        <tbody>
            {formats.map((item, index) =>
                <FormatItem onDownload={onDownload} {...item} formatType={formatType} key={`videoFormat_${index}`} />
            )
            }
        </tbody>
    )
}

export default FormatList
