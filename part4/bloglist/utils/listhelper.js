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

const mostBlogs = blogs => {
  const authors = blogs.map(i => i.author).sort()
  let maxCount = 0
  let currentCount = 0
  let currentAuthor = ''
  let mostFrequentAuthor = ''

  authors.forEach(author => {
    if (author !== currentAuthor) {
      currentAuthor = author
      currentCount = 0
      if (maxCount < currentCount) {
        maxCount = currentCount
        mostFrequentAuthor = author
      }
      if (mostFrequentAuthor === '') {
        mostFrequentAuthor = author
      }
    }

    if (author === currentAuthor) {
      currentCount += 1

      if (maxCount < currentCount) {
        maxCount = currentCount
        mostFrequentAuthor = author
      }
      if (mostFrequentAuthor === '') {
        mostFrequentAuthor = author
      }
    }
  })

  return { author: mostFrequentAuthor, blogs: currentCount }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
