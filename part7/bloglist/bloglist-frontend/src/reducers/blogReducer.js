import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZATION':
            return action.data.blogs

        case 'CREATE_BLOG':
            return [...state, action.data.newBlog]
                
        default:
            return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()

        dispatch({
          type: 'INITIALIZATION',
          data: {blogs}
        })
    }
}

export const createBlog = (obj) => {
    return async dispatch => {
        const newBlog = await blogService.create(obj)

        dispatch({
          type: 'CREATE_BLOG',
          data: {newBlog}
        })
    }
}

export default blogReducer