import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import EditYear from './EditYear'

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
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                Born
              </th>
              <th>
                Books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>

        {props.token && <EditYear editAuthor={editAuthor} authors={authors}/>}
      </div>
  )
  } catch (error) {
    return null
  }
}

export default Authors