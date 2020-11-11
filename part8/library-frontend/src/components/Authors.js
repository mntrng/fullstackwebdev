import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const allAuthorResults = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show || allAuthorResults.loading) {
    return null
  }

  const authors = allAuthorResults.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    let author = event.target.name.value
    let born = parseInt(event.target.born.value)

    await editAuthor({ variables: { 'name': author, 'setBornTo': born } })
  }

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
            
      <h2>Set Birthyear</h2>
        <form onSubmit={submit}>
            <div>
            Author Name &nbsp;
            <select name='name'>
              <option>Select an author</option>
              {authors.map(a => {
                return (
                  <option key={a.name} >
                    {a.name}
                  </option>
                )
              })}
            </select>
            </div>
            <div>
            Born &nbsp;
            <input type='number' name='born' />
            </div>
            <button type='submit'>Update Author</button>
        </form>
    </div>
  )
}

export default Authors
