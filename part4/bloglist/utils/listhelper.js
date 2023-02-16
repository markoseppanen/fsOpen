const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((favoriteBlog, nextBlog) => {
    return favoriteBlog.likes > nextBlog.likes ? favoriteBlog : nextBlog
  }, 'empty list')
}

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

console.log(favoriteBlog(listWithOneBlog))
console.log(favoriteBlog(listOfBlogs))
console.log(favoriteBlog(emptyBlogList))

module.exports = { dummy, totalLikes, favoriteBlog }
