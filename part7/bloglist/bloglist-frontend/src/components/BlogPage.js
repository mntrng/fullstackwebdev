import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import React, { useRef } from 'react'

const BlogPage = ( { blogs, handleLike, handleBlogDelete, user, handleBlogAddition } ) => {
    
    const blogFormRef = useRef()

    return (
        <div>
            <Togglable buttonLabel = "Create a new blog" ref={blogFormRef}>
                <BlogForm handleBlogAddition = {handleBlogAddition} />
            </Togglable>

            <h2>Blogs</h2>
            {blogs.sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog key={blog.id} blog={blog} user={user}
                handleLike={handleLike} handleDeleteBlog={handleBlogDelete}/>
            )}
        </div>
    )
}

export default BlogPage