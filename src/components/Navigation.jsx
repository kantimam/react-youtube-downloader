import React from 'react'
import {Link} from 'react-router-dom'
import { Icon } from './Icon'

export default () => {
    return (
        <nav id="nav">
            <div className="inner">
                <Icon/>
                <section>
                    <Link to="/search" className="pointer undecoratedLink">SEARCH</Link>
                </section>
            </div>
        </nav>
    )
}
