import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const allBookResults = useQuery(ALL_BOOKS)
  if (!props.show || allBookResults.loading) {
    return null
  }

  try {
    const books = allBookResults.data.allBooks

    return (
      <div>
        <h2>Books</h2>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                Author
              </th>
              <th>
                Published
              </th>
            </tr>
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  } catch (error) {
    return null
  }
}

export default Books