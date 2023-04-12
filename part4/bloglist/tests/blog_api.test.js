const mongoose = require('mongoose')
const config = require('../utils/config')
const mongoUrl = config.MONGODB_URI

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '63da1e3328967a8901b29f3b',
    title: 'SchizoBlog',
    author: 'Janne Toivoniemi',
    url: 'https://schizoblog.me/',
    likes: 69,
    __v: 0
  },
  {
    _id: '63ecc789748aa081c373bd87',
    title: 'Also Sprach Jussi',
    author: 'Jussi Mäntysaari',
    url: 'http://alsosprachjussi.blogspot.com/',
    likes: 666,
    __v: 0
  }
]

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

describe('blog api tests', () => {
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
})
