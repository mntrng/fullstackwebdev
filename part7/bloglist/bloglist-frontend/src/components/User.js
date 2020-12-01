import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BookIcon from '@material-ui/icons/Book'
import React from "react";

const User = ({ user }) => {

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>Author: {user.name}</h2>
            <h4>Added Blogs</h4>

            <List>
                {user.blogs.map(blog =>
                    <ListItem dense key={blog.id}>
                        <ListItemIcon><BookIcon /></ListItemIcon>
                        <ListItemText> {blog.title} </ListItemText>
                    </ListItem>
                )}
            </List>
        </div>
    )
}

export default User