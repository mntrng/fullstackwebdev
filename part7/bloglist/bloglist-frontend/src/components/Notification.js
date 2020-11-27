import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  } else {
    return (
      <div>
        {notification.msg[1] ? <Alert severity="success">{notification.msg[0]}</Alert>
                             : <Alert severity="error">{notification.msg[0]}</Alert>}
      </div>
    )
  }
}

export default Notification