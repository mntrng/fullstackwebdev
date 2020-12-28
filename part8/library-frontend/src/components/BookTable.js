import React from 'react'
import { Container, Table } from 'semantic-ui-react'

const BookTable = ({selectedBooks}) => {
    return (
        <Container style={{ marginBottom: 20 }}>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Author</Table.HeaderCell>
                    <Table.HeaderCell>Published</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {selectedBooks.map(a =>
                    <Table.Row key={a.title}>
                        <Table.Cell>{a.title}</Table.Cell>
                        <Table.Cell>{a.author.name}</Table.Cell>
                        <Table.Cell>{a.published}</Table.Cell>
                    </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default BookTable