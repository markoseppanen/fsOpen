const mongoose = require('mongoose')
const config = require('../utils/config')
const mongoUrl = config.MONGODB_URI

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const additionalBlog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12
}

beforeAll(async () => {
  await mongoose.connect(mongoUrl) // Fixes "Jest did not exit"-warning
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('blog api GET-tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('blog api POST-tests', () => {
  test('number of blogs is incremented and data matches', async () => {
    await api
      .post('/api/blogs')
      .send(additionalBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(({ id, ...rest }) => rest)

    expect(blogs).toHaveLength(3)
    expect(blogs[2]).toEqual(additionalBlog)
  })

  test('if likes is missing it defaults to 0', async () => {
    const blogWithoutLikes = (({ likes, ...rest }) => rest)(additionalBlog)

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.pop()

    expect(blog.likes).toBe(0)
  })

  test('if title or url is missing responds with 400 bad request', async () => {
    const blogWithoutUrl = (({ url, ...rest }) => rest)(additionalBlog)

    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)

    const blogWithoutTitle = (({ title, ...rest }) => rest)(additionalBlog)

    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
  })
})

describe('blog api DELETE-tests', () => {
  test('deletion of single blog by ID succeeds', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    await api.delete(`/api/blogs/${initialBlogs[initialBlogs.length - 1].id}`)

    const postDeletionResponse = await api.get('/api/blogs')
    const postDeletionBlogs = postDeletionResponse.body

    expect(postDeletionBlogs.length).toBe(initialBlogs.length - 1)
  })
})

describe('blog api PUT-tests', () => {
  test('updating blogs likes succeeds', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    const blog = initialBlogs[0]
    blog.likes += 1

    const updatedResponse = await api.put(`/api/blogs/${blog.id}`).send(blog)
    const updatedBlog = updatedResponse.body

    // Check that PUT-operation returns updated blog instead of original
    expect(updatedBlog.likes).toBe(blog.likes)

    const postUpdateResponse = await api.get('/api/blogs')
    const postUpdateBlogs = postUpdateResponse.body

    // Check that new GET-operation returns correctly updated blog
    expect(postUpdateBlogs[0].likes).toBe(blog.likes)
  })
})
