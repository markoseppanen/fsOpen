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
    const newBlog = new Blog(additionalBlog)
    await newBlog.save()

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(({ id, ...rest }) => rest)

    expect(blogs).toHaveLength(3)
    expect(blogs[2]).toEqual(additionalBlog)
  })

  test('if likes is missing it defaults to 0', async () => {
    const newBlog = new Blog(additionalBlog)
    newBlog.likes = undefined
    await newBlog.save()

    const response = await api.get('/api/blogs')
    const blog = response.body.pop()

    console.log(blog)

    expect(blog.likes).toBe(0)
  })
})
