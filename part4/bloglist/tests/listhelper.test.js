const listHelper = require('../utils/listhelper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
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
  const emptyArray = []

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(735)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyArray)
    expect(result).toBe(0)
  })
})
