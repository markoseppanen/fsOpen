const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const { url, title } = request.body

  if (!url || !title) {
    response.status(400).send('Title or url missing.')
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = { ...request.body }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    .then(updatedBlog => response.json(updatedBlog))
    .catch(error => next(error))
})

module.exports = blogsRouter
