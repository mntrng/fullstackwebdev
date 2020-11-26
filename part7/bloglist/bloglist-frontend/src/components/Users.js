import userService from "../services/users"
import React, { useEffect, useState } from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const users_ = await userService.getAll()
            setUsers(users_)
        })()
    }, [])

    return (
        <Container>
        <div>
            <h2>Users</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell fontWeight="fontWeightMedium">User</TableCell>
                            <TableCell fontWeight="fontWeightMedium">Number of blogs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                <tr>
                    <th>User</th>
                    <th>Number of blogs</th>
                </tr>
    
                {users.map(user => {
                    return (
                        <tr key={user.username}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )
                })
                }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </Container>
    )
}

export default Users