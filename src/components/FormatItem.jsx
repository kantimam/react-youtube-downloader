import React from 'react'

const FormatItem = ({ type, quality, url, downloadUrl }) => {
    return (
        <tr id="formatItem">
            <td id="format">{type}</td>
            <td id="quality">{quality}</td>
            <td className="centerText">
                <a href={url}>
                    SOURCE
                </a>
            </td>
            <td className="pointer" id="download">
                DOWNLOAD
                </td>
        </tr>
    )
}

export default FormatItem