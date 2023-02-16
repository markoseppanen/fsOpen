const listHelper = require('../utils/listhelper')

// Dummy data start
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listOfBlogs = [
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

const emptyBlogList = []
// Dummy data end

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(735)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('list with single blog should return it', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0])
  })

  test('list with multible blogs should return highest rated one', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toBe(listOfBlogs[1])
  })

  test('empty list should return a string', () => {
    const result = typeof listHelper.favoriteBlog(emptyBlogList)
    expect(result).toBe('string')
  })
})
