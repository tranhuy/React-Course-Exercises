const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const blogHelper = require('../utils/test_helper')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

let token

beforeAll(async () => {
   await api
    .post('/api/login')
    .send({
      username: 'tranhuy',
      password: 'password'
    })
    .then((res) => {
      token = res.body.token
    })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('DB cleared')

  await Blog.insertMany(blogHelper.testBlogs)

  // let blogObjects = blogHelper.testBlogs.map(blog => new Blog(blog))
  // let promises = blogObjects.map(blog => blog.save())
  // await Promise.all(promises)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogHelper.testBlogs.length)
})

test('valid blog can be added', async () => {
  let newBlog = {
        title: "The rise and rise of Bitcoin",
        author: "Huy Tran",
        url: "https://www.coindesk.com/",
        likes: 100
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const updatedBlogs = await blogHelper.blogsInDb()
    expect(updatedBlogs).toHaveLength(blogHelper.testBlogs.length + 1)
    expect(response.body).toEqual(JSON.parse(JSON.stringify(updatedBlogs[blogHelper.testBlogs.length])))
})

test('blog without likes can be added and defaults to 0', async () => {
  let newBlog = {
    title: "Creation of Wealth",
    author: "Julie Tang",
    url: "https://www.coindesk.com/",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const updatedBlogs = await blogHelper.blogsInDb()
    expect(updatedBlogs).toHaveLength(blogHelper.testBlogs.length + 1)
    expect(response.body.likes).toEqual(0)
})

test('blog without title and url cannot be added', async() => {
  let newBlog = {
    author: "Julie Tang",
    likes: 25
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const updatedBlogs = await blogHelper.blogsInDb()
    expect(updatedBlogs).toHaveLength(blogHelper.testBlogs.length)
})

test('adding blog fails without token', async() => {
  let newBlog = {
    title: "To Da Moon",
    author: "Huy Tran",
    url: "https://www.coindesk.com/",
    likes: 23
  }

  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(401)
  .expect('Content-Type', /application\/json/)

  const updatedBlogs = await blogHelper.blogsInDb()
  expect(updatedBlogs).toHaveLength(blogHelper.testBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

/* describe('total likes', () => {
      test('sum all blog likes', () => {
          const result = listHelper.totalLikes(blogs)
          expect(result).toBe(36)
      })
})

describe('favorite blog', () => {
  test('blog with most likes', () => {
    let favBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    const result = listHelper.favBlog(blogs)
    expect(result).toEqual(favBlog)
  })
})

describe('most prolific author', () => {
  test('author with most blogs', () => {
    let author = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(author)
  })
})

describe('most popular author', () => {
  test('author with most likes', () => {
    let author = {
      author: "Robert C. Martin",
      likes: 32
    }

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(author)
  })
}) */