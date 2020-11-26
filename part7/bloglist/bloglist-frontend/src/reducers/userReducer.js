const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'CREATE_USER':
            return action.data.user

        default:
            return state
    }
}

export const setUser = (user) => {
    return {
        type: 'CREATE_USER',
        data: {user}
    }
}

export default userReducer