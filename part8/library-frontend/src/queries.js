import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
}`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    id
    born
    bookCount
}`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query getBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) { 
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
 `

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) 
    {
      addBook(title: $title, author: $author, published: $published, genres: $genres) 
      {
        ...BookDetails
      }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor( $name: String!, $setBornTo: Int! )
    {
      editAuthor(name: $name, setBornTo: $setBornTo)
      {
          name
          born
      }
    }
`

export const LOGIN = gql`
    mutation login( $username: String!, $password: String! )
    {
      login(username: $username, password: $password)
      {
        value
      }
    }
`

export const CURRENT_USER = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`