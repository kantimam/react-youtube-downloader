import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../img/coon.png'

export const Icon = () => {
    return (
        <Link id="mainIcon" className="centerAll" to="/">
            YT
            <img src={icon} alt="coon icon" />
            COON
        </Link>
    )
}
