const notificationReducer = (state = '', action) => {

    switch (action.type) {
      case 'NOTIFICATION':
        return action.data

      case 'RESET':
        return state = ''

      default:
        return state
    }
}

export const setNotification = msg => {
    return {
        type: 'NOTIFICATION',
        data: {msg}
    }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer