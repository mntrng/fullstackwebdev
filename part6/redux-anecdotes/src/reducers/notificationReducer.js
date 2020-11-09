const notificationReducer = (state = '', action) => {

    switch (action.type) {
      case 'NOTIFICATION':
        return action.data

      default:
        return state
    }
}

export const setNotification = (msg, length) => {
    return async dispatch => {
      dispatch({
        type: 'NOTIFICATION',
        data: {msg}
      })

      setTimeout(() => {
        dispatch({
          type: 'NOTIFICATION',
          data: ''
        })}, 1000 * length)
    }
}

export default notificationReducer