const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const newData = request.body

    const user =  await User.findById(newData.userId)

    const blog = new Blog({
        title  : newData.title,
        author : newData.author,
        url    : newData.url,
        likes  : newData.likes || 0,
        user   : user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const content = request.body
    const newInfo = {
		likes: content.likes
	}

    // runValidators: turn on validation on update
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newInfo, { new: true, runValidators: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter