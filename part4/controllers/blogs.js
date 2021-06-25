const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
    
    // Blog.find({}).then(blogs => {
    //     res.json(blogs)
    // })
})

blogsRouter.get('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
        response.json(blog)
    } else {
        res.status(404).end()
    }

    // Blog.findById(req.params.id)
    //     .then(blog => {
    //         if (blog) {
    //             res.json(blog)
    //         } else {
    //             res.status(404).end()
    //         }
    //     })
    //     .catch(err => next(err))
})

blogsRouter.post('/', async (req, res, next) => {
    let newBlog = new Blog(req.body)

    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)

    // newBlog.save()
    //     .then(savedBlog => {
    //         res.status(201).json(savedBlog)
    //     })
    //     .catch(err => next(err))
})

blogsRouter.delete('/:id', async (req, res, next) => {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id)

    if (deletedBlog) {
        res.status(204).end()
    } else {
        res.status(404).send('Contact not found')
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const {title, author, url, likes } = req.body

    let blog = {
        title: title,
        author: author,
        url: url,
        likes: likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' })

    if (updatedBlog) {
        res.json(updatedBlog)
    } else {
        res.status(404).send('Contact not found')
    }    
})

module.exports = blogsRouter