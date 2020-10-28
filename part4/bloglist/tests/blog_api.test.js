const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/apitest_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('tests for the blog api', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogObjects = helper.blogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        // Promise.all waits for all operations to complete
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {    
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs', async () =>  {
        const data = await api.get('/api/blogs')
        expect(data.body.length).toBe(helper.blogs.length)
    })

    test('id usage', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body[0].id).toBeDefined()
    })

    test('post operation', async () => {
        const newBlog = {
            title  : 'Test',
            author : 'Test 1',
            url    : 'testxxx.com',
            likes  : 111010101010
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const data = await api.get('/api/blogs')
        expect(data.body.length).toBe(helper.blogs.length + 1)
        const newTitle = data.body[data.body.length-1].title
        expect(newTitle).toEqual('Test')
    })

    test('if field likes is absent, default to 0', async () => {
        const newBlog = {
            title  : 'Test',
            author : 'Test 1',
            url    : 'testxxx.com',
        }

        const postedBlog = await api
                        .post('/api/blogs')
                        .send(newBlog)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)
        expect(postedBlog.body.likes).toBe(0)
    })

    test('requests without required fields should fail', async () => {
        const blogMissingTitle = new Blog({
            author : 'Invalid 1',
            url    : 'testxxx.com',
        })

        const blogMissingUrl = new Blog({
            title: 'Invalid 2',
            author : 'Invalid 2'
        })

        let err1, err2
        try {
            const blogMissingTitleSend = await blogMissingTitle.save()
        } catch (error) {
            err1 = error
        }
        try {
            const blogMissingUrlSend = await blogMissingUrl.save()
        } catch (error) {
            err2 = error
        }

        expect(err1).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err2).toBeInstanceOf(mongoose.Error.ValidationError)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
              .post('/api/users')
              .send(newUser)
              .expect(201)
              .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('check username uniqueness', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = { username: 'root', name: 'Superuser', password: 'salainen' }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('invalid username length', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = { username: 'xx', name: 'Superuser', password: 'salainen' }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('shorter than the minimum')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})