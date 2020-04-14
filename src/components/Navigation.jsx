import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'

export default () => {
    return (
        <nav id="nav">
            <div className="inner">
                <Icon />
                <section>
                    <NavLink activeClassName="navLinkActive"
                        isActive={(match, location) => !location.pathname.match(/\/search/)}
                        to="/" className="pointer undecoratedLink">
                        DL
                    </NavLink>
                    <NavLink activeClassName="navLinkActive" to="/search" className="pointer undecoratedLink">SEARCH</NavLink>
                </section>
            </div>
        </nav >
    )
}
