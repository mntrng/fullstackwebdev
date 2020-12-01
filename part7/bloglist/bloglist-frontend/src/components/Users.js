import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Link } from "react-router-dom";

const Users = ({users}) => {

    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Number of blogs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => {
                            return (
                                <TableRow key={user.username}>
                                    <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                    <TableCell>{user.blogs.length}</TableCell>
                                </TableRow>
                            )})
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users