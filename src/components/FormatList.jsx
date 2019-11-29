import React from 'react'
import FormatItem from './FormatItem'

const FormatList = ({formats=[]}) => {
    return (
        <tbody>
            {formats.map((item, index) =>
                <FormatItem {...item} key={`videoFormat_${index}`} />
            )
            }
        </tbody>
    )
}

export default FormatList
