import React from 'react'

const Notification = ({ message }) => {
    
    if (message === null) {
        return null
    } else {
        if (message[1]) {
            return (
                <div className="good">
                    {message}
                </div>
            )
        } else {
            return (
                <div className="error">
                    {message}
                </div>
            )
        }
    }
}

export default Notification;