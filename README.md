# :books: Book Search Engine (GraphQL Refactor)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Tech](https://img.shields.io/badge/Tech-MERN-green.svg)](https://en.wikipedia.org/wiki/MERN)
[![GraphQL](https://img.shields.io/badge/API-GraphQL-E10098.svg)](https://graphql.org/)
[![Apollo](https://img.shields.io/badge/Apollo-Client%2FServer-311C87.svg)](https://www.apollographql.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)](https://www.mongodb.com/)

A full-stack MERN application that allows users to search for books using the Google Books API and save their favorites for later. This project was refactored from a RESTful API to a **GraphQL** API with **Apollo Server** and **Apollo Client**.

---

## :globe_with_meridians: Deployed Application

:link: **Live Demo**: [Deployed App on Render](https://your-deployment-url-here.com)

:open_file_folder: **Repository**: [GitHub Repo](https://github.com/yourusername/book-search-graphql)

---

## :book: Table of Contents

- [:sparkles: Features](#-features)
- [:test_tube: Technologies Used](#-technologies-used)
- [:rocket: Getting Started](#-getting-started)
- [:dna: GraphQL Schema Overview](#-graphql-schema-overview)
- [:bulb: Usage](#-usage)
- [:frame_photo: Screenshots](#-screenshots)
- [:page_facing_up: License](#-license)

---

## :sparkles: Features

- :closed_lock_with_key: JWT authentication and protected routes
- :mag: Search books via Google Books API
- :floppy_disk: Save & delete books from personal collection
- :cloud: Persistent MongoDB storage
- :brain: Apollo Server + Apollo Client for GraphQL API communication

---

## :test_tube: Technologies Used

- MongoDB + Mongoose
- Express.js
- React
- Node.js
- Apollo Server & Client
- GraphQL
- JWT (jsonwebtoken)
- Google Books API
- Heroku/Render for deployment

---

## :rocket: Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/book-search-graphql.git
   cd book-search-graphql
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd client && npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root and add:

   ```
   MONGODB_URI=mongodb://localhost:27017/booksearch
   JWT_SECRET=yourSecretKey
   ```

4. **Run the app locally**

   ```bash
   npm run develop
   ```

   This will run both the client and server concurrently.

---

## :dna: GraphQL Schema Overview

### Types

```graphql
type User {
  _id: ID!
  username: String!
  email: String!
  bookCount: Int
  savedBooks: [Book]
}

type Book {
  bookId: String!
  authors: [String]
  description: String
  title: String!
  image: String
  link: String
}
```

### Queries

```graphql
me: User
```

### Mutations

```graphql
login(email: String!, password: String!): Auth
addUser(username: String!, email: String!, password: String!): Auth
saveBook(input: BookInput!): User
removeBook(bookId: String!): User
```

---

## :bulb: Usage

1. Create an account or log in
2. Search for books
3. Save favorites to your profile
4. Remove saved books anytime

---

## :frame_photo: Screenshots

> _(Include your own screenshots or placeholders here)_

![Screenshot of Home Page](./screenshots/home.png)
![Screenshot of Search Results](./screenshots/search.png)
![Screenshot of Saved Books](./screenshots/saved.png)

---

## :page_facing_up: License

This project is licensed under the [MIT License](./LICENSE).

---

## :raised_hands: Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## :mailbox: Contact

For questions or suggestions, reach out at jsanc33.

---
