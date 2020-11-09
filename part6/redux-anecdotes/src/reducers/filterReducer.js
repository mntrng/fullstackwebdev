const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'RESULT':
            return action.data.filter
        default:
            return state
    }
}

export const setFilter = filter => {
    return {
        type: 'RESULT',
        data: {filter}
    }
}

export default filterReducer