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

const bigListofBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
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

describe('most blogs', () => {
  test('author with most blogs in the big list', () => {
    const result = listHelper.mostBlogs(bigListofBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('list with single blog should return its author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
})

describe('most likes', () => {
  test('correct result for big list of blogs', () => {
    const result = listHelper.mostLikes(bigListofBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

  test('correct result for small list', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    expect(result).toEqual({
      author: 'Jussi Mäntysaari',
      likes: 666
    })
  })

  test('correct result for list with only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
})
