import BlogForm from './BlogForm'
import Togglable from './Togglable'
import React from 'react'
import StarRateTwoToneIcon from '@material-ui/icons/StarRateTwoTone'
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link  } from 'react-router-dom'

const BlogPage = ( { blogs, handleBlogAddition, blogFormRef } ) => {
    
    return (
        <div>
            <Togglable buttonLabel = "Create a new blog" ref={blogFormRef}>
                <BlogForm handleBlogAddition = {handleBlogAddition} />
            </Togglable>

            <h2>Blogs</h2>
            <List>
                {blogs.sort((a, b) => b.likes - a.likes)
                .map(blog => 
                    <ListItem dense key={blog.id}>
                        <ListItemIcon><StarRateTwoToneIcon /></ListItemIcon>
                        <ListItemText>
                            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        </div>
    )
}

export default BlogPage