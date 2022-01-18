const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError } = require('apollo-server-core')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((err) => {
      console.log('error connecting to MongoDB:', err.message)
    })   


const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type User {
      username: String!
      passwordHash: String!
      favoriteGenre: String
      id: ID!
    }
    
    type Token {
      value: String!
    }    

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        currentUser: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ) : Book
        addAuthor(
            name: String!
            born: Int
            bookCount: Int!
        ) : Author
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author
        createUser(
          username: String!
          password: String!
          favoriteGenre: String!
        ) : User
        login(
          username: String!
          password: String!
        ) : Token
    }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({ author: author, genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
            }

            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({ author: author }).populate('author', { name: 1, born: 1 })
            } 
          
            if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
            }

            return Book.find({}).populate('author', { name: 1, born: 1 })
      }, 
      allAuthors: async () => await Author.find({}),
      currentUser: (root, args, context) => context.currentUser,
  },
  Author: {
      bookCount: async (root) => (await Book.find({ author: root })).length
  },
  Mutation: {
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
            throw new AuthenticationError('Not Authenticated')
        }

        const newBook = new Book({ ...args })

        try {
          let author = await Author.findOne({ name: args.author })
          //Add new author if author name provided in mutation args does not exist
          if (!author) {
            author = new Author({ name: args.author })
            await author.save() 
          }
        
          newBook.author = author
          await newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }

        return newBook
      },
      editAuthor: async (root, { name, setBornTo}, context) => {
          if (!context.currentUser) {
              throw new AuthenticationError('Not Authenticated')
          }

          const author = await Author.findOne({ name })
          if (!author) {
              return null
          }

          author.born = setBornTo

          try {
            await author.save()
          } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: { name, setBornTo} })
          }

          return author
      },
      createUser: async (root, args) => {
          const saltRounds = 10
          const passwordHash = await bcrypt.hash(args.password, saltRounds)

          const newUser = new User({ username: args.username, passwordHash, favoriteGenre: args.favoriteGenre })

          try {
            await newUser.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }

          return newUser
      },
      login: async (root, { username, password }) => {
          const user = await User.findOne({ username })
          const isPasswordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false

          if (!isPasswordCorrect) {
            throw new UserInputError('Invalid Credentials')
          }

          const userToken = {
            username,
            id: user._id
          }

          return { value: jwt.sign(userToken, process.env.SECRET) }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})