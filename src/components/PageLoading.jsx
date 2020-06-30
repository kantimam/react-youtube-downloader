import React, { useState, useEffect } from 'react'

const PageLoading = () => {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const timeOut = setTimeout(() => setReady(true), 800);
        return () => {
            clearTimeout(timeOut);
        };
    }, [])

    return ready && <div id="loadingScreen" className={`flexColumnCenter`}>
        <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
        </div>
            LOADING
        </div>

}

export default PageLoading