import React, { useEffect } from 'react'

const Modal = (props) => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])
    return (
        <div className="modal">
            {props.children}
        </div>
    )
}

export default Modal
