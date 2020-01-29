import React from 'react'
import icon from '../img/coon.png'

const Banner = ({text="YOUTUBE COON"}) => {
    return (
        <div id="banner" className="centerText">
            <img alt="panda" src={icon}/>
            <h1>{text}</h1>
        </div>
    )
}

export default Banner
