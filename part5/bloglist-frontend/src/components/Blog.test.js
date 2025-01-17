/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

let blog, user

beforeEach(() => {
  blog = {
    title: 'ABCDXYZ',
    author: 'Gordon Ramsey',
    url: 'test.com',
    likes: 3,
    user: {
      name: 'Iron Man',
      username: 'ironman'
    }
  }

  user = {
    name: 'Iron Man',
    username: 'ironman'
  }
})

test('renders title and author, not url and likes', () => {

  const component = render(
      <Blog blog={blog} user={user}/>
  )

  const div = component.container.querySelector('.forTest')

  expect(div).toHaveStyle('display: none;')
  expect(component.container).toHaveTextContent('ABCDXYZ by Gordon')
})

test('renders url and like when view button is clicked', () => {

  const mockHandler = jest.fn()

  const component = render(
      <Blog blog={blog} user={user} onClick={mockHandler}/>
  )

  const btn = component.getByText('View')
  fireEvent.click(btn)

  const div = component.container.querySelector('.forTest')

  expect(div).toHaveStyle('')
  expect(component.container).toHaveTextContent('URL: test.com Likes: 3')
})

test('click like twice', () => {

  const mockHandler = jest.fn()

  const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler}/>
  )

  blog = { ...blog, likes: blog.likes + 1 }

  const btn = component.getByText('Like')
  fireEvent.click(btn)
  fireEvent.click(btn)

})

test('test blog form submission', () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm handleBlogAddition={mockHandler} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, { target: { value: 'test123' } })
  fireEvent.change(author, { target: { value: 'testhaha' } })
  fireEvent.change(url, { target: { value:'xxxx.com' } })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls.length).toEqual(1)
  expect(mockHandler.mock.calls[0][0].author).toEqual('testhaha')
})