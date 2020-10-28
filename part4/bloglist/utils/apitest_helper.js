const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
    {
      title: 'Universe 101',
      author: 'Stephen Hawking',
      url: 'https://universeftw.ftw/',
      likes: 9999,
      id: '5f97fb9abcdf9d03d7681a4b'
    },
    {
      title: 'Universe 201',
      author: 'Albert Eistein',
      url: 'https://universeistheshit.vn/',
      likes: 10000,
      id: '5f20249805551f98bse8a622'
    }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {blogs, usersInDb}