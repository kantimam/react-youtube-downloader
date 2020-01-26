import React from 'react'

const Error = ({message, children}) => {
    return (
        <div className="errorMessage centerText textUpper">
            <p>{message}</p>
            {children}
        </div>
    )
}

export default Error
