import React, { useState, useEffect } from 'react'

const PageLoading = () => {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const timeOut=setTimeout(() => setReady(true), 800);
        return () => {
            clearTimeout(timeOut);
        };
    }, [])
    
    return ready && <div id="loadingScreen" className="centerAll">LOADING...</div>
        
}

export default PageLoading