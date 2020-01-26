import React from 'react'

const Progress = ({size, progress}) => {
    return (
        <div className="progressContainer centerText fancyShadow">
            <p>SIZE: {(size/1000000).toFixed(2)} MB</p>
            <progress value={progress} max={size}/>
        </div>
    )
}

export default Progress
