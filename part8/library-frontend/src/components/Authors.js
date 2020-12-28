import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Container, Icon, Table } from 'semantic-ui-react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import EditYear from './EditYear'
import 'semantic-ui-css/semantic.min.css';

const Authors = (props) => {
  const allAuthorResults = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show || allAuthorResults.loading) {
    return null
  }

  try {
    const authors = allAuthorResults.data.allAuthors

    return (
        <Container style={{ marginTop: 25 }}>
        <h2>Authors</h2>

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Born</Table.HeaderCell>
              <Table.HeaderCell>Books</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {authors.map(a =>
              <Table.Row key={a.name}>
                <Table.Cell><Icon name='user secret'/> {' '} {a.name}</Table.Cell>
                <Table.Cell>{a.born}</Table.Cell>
                <Table.Cell>{a.bookCount}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        {props.token && <EditYear editAuthor={editAuthor} authors={authors}/>}
        </Container>
  )
  } catch (error) {
    return null
  }
}

export default Authors