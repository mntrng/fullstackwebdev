import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  } else {
    if (notification.msg[1]) {
      return (
        <div className="good">
          {notification.msg[0]}
        </div>
      )
    } else {
      return (
        <div className="error">
          {notification.msg[0]}
        </div>
      )
    }
  }
}

export default Notification