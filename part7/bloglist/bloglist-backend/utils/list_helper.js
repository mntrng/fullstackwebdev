const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
    const reducer = (sum, currentItem) => {
        return sum + currentItem.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const likeList = blogs.map(blog => blog.likes)
    const max = Math.max.apply(Math, likeList)
    return blogs.find(blog => blog.likes === max)
}

const mostBlogs = blogs => {
    const authorList = _.map(blogs, 'author')
    const counts = _.countBy(authorList)
    const mostBlog = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b)

    return { author: mostBlog, blogs: counts[mostBlog]}
}

const mostLikes = blogs => {
    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = _.uniq(authors)
    const totalAuthors = []

    uniqueAuthors.forEach(author => {
        var n = 0
        blogs.forEach(blog => {
            if (blog.author === author) {
                n += blog.likes
            }
        })
        totalAuthors.push({ author: author, likes: n})
    })
    let result = favoriteBlog(totalAuthors)
    return result
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}