var t

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data
        
        default:
            return state
    }
}

export const setNotification = (msg) => {
    return async dispatch => {
        dispatch({
          type: 'NOTIFICATION',
          data: {msg}
        })
  
        clearTimeout(t)
  
        t = setTimeout(() => {
          dispatch({
            type: 'NOTIFICATION',
            data: null
        })}, 4000)
    }
}

export default notificationReducer