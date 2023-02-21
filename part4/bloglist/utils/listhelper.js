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
  const freq = {}
  let max = 0
  let result

  for (const blog of blogs) {
    if (freq[blog.author]) {
      freq[blog.author] += 1
    } else {
      freq[blog.author] = 1
    }
  }

  for (const author in freq) {
    if (freq[author] > max) {
      max = freq[author]
      result = author
    }
  }

  return { author: result, blogs: max }
}

const mostLikes = blogs => {
  const likes = {}
  let mostLikes = 0
  let result

  for (const blog of blogs) {
    if (likes[blog.author]) {
      likes[blog.author] += blog.likes
    } else {
      likes[blog.author] = blog.likes
    }
  }

  for (const author in likes) {
    if (likes[author] > mostLikes) {
      mostLikes = likes[author]
      result = author
    }
  }

  return { author: result, likes: mostLikes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
