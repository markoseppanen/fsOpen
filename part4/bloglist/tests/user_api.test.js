const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    username: 'testUser1',
    name: 'Test Userone',
    password: 'salasana'
  }
]

const additionalUser = {
  username: 'addedUser',
  name: 'Added User',
  password: 'pass1234'
}

beforeEach(async () => {
  await User.deleteMany({})
  const usersToInsert = initialUsers.map((user) => new User(user))
  await User.insertMany(usersToInsert)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('users api POST-tests', () => {
  test('user is added and saved correctly', async () => {
    await api
      .post('/api/users')
      .send(additionalUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const users = response.body.map(({ id, ...rest }) => rest)

    expect(users).toHaveLength(2)
  })

  test('user is not added if username is missing', async () => {
    const userWithoutUsername = { ...additionalUser }
    delete userWithoutUsername.username

    await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('user is not added if username is too short', async () => {
    const userWithShortUsername = { ...additionalUser, username: 'ab' }

    await api
      .post('/api/users')
      .send(userWithShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('user is not added if password is missing', async () => {
    const userWithoutPassword = { ...additionalUser }
    delete userWithoutPassword.password

    await api
      .post('/api/users')
      .send(userWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('user is not added if username is too short', async () => {
    const userWithShortPassword = { ...additionalUser, password: 'ab' }

    await api
      .post('/api/users')
      .send(userWithShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})
