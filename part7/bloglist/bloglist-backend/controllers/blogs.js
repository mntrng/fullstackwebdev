const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const newData = request.body
    const token = request.token

    // jwt.verify returns an object
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user =  await User.findById(decodedToken.id)

    const blog = new Blog({
        title  : newData.title,
        author : newData.author,
        url    : newData.url,
        likes  : newData.likes || 0,
        user   : user._id
    })

    const savedBlog = await blog.save()
    savedBlog.populate('user').execPopulate()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if(decodedToken.id.toString() === blog.user.toString()) {
        await blog.remove()
        response.status(204).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const content = request.body
    const newInfo = {
		likes: content.likes
    }
    
    // runValidators: turn on validation on update
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newInfo, { new: true, runValidators: true })
    response.json(updatedBlog)
})

blogsRouter.put('/:id/comments', async (request, response) => {
    const content = request.body
    const newInfo = {
		comments: content.comments
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newInfo, { new: true })
        response.json(updatedBlog)
    } catch {
        response.status(400).json({ error: 'No comment added!' })
    }
})

module.exports = blogsRouter