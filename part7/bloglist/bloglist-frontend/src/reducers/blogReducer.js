import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {
        case 'INITIALIZATION':
            return action.data.blogs

        case 'CREATE_BLOG':
            return [...state, action.data.newBlog]

        case 'ADD_COMMENT':
            return state.map(blog => blog.id !== action.data.id ? blog : { ...blog, comments: action.data.comments})

        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)

        case 'LIKE_BLOG':
            return state.map(blog => blog.id === action.data.id ? { ...blog, likes: action.data.likes } : blog)
                
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

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)

        dispatch({
          type: 'DELETE_BLOG',
          data: {id}
        })
    }
}

export const addComment = (obj) => {
    return async dispatch => {
        const updatedBlog = await blogService.createComment(obj)

        dispatch({
          type: 'ADD_COMMENT',
          data: updatedBlog
        })
    }
}

export const likeBlog = (obj) => {
    return async dispatch => {
        const likedBlog = await blogService.update(obj)

        dispatch({
          type: 'LIKE_BLOG',
          data: likedBlog
        })
    }
}

export default blogReducer