import React from 'react'
import FormatItem from './FormatItem'

const FormatSelect = () => {
    return (
        <table id="formatSelect">
            <tr id="tableHeader">
                <th>FORMAT</th>
                <th>QUALITY</th>
                <th>DOWNLOAD</th>
            </tr>
            <FormatItem/>
        </table>
    )
}

export default FormatSelect
