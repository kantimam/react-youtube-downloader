import React from 'react'
import {Link} from 'react-router-dom'

export default () => {
    return (
        <nav id="nav">
            <div className="inner">
                <Link to="/" id="logo" className="pointer undecoratedLink">YOUTUBE COON</Link>
                <section>
                    <a href="info">INFO</a>
                    <a href="contact">CONTACT</a>
                </section>
            </div>
        </nav>
    )
}
