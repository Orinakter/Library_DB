# 📚 Library Management API

A RESTful Library Management System built using **Express**, **TypeScript**, and **MongoDB (Mongoose)**. It allows users to manage books, borrow them with availability control, and get borrowing summaries using aggregation.

---

## 🚀 Features

- Create, read, update, and delete books
- Filter, sort, and paginate book listings
- Borrow books with proper validation and logic
- Track total borrowed quantity using aggregation
- Schema validation and business logic enforcement
- Mongoose static methods, instance methods, and middleware
- Standardized API responses and centralized error handling

---

## 🧰 Tech Stack

- **Backend Framework:** Express.js (with TypeScript)
- **Database:** MongoDB (via Mongoose)
- **Validation:** Mongoose validation and custom error formatting
- **Dev Tools:** ts-node-dev, dotenv

---

## 🔗 API Endpoints

### 📘 Book Endpoints

- `POST /api/books` - Create a new book
- `GET /api/books` - Get all books (supports filter, sort, limit)
- `GET /api/books/:bookId` - Get a single book by ID
- `PUT /api/books/:bookId` - Update a book (e.g., update copies)
- `DELETE /api/books/:bookId` - Delete a book

### 📗 Borrow Endpoints

- `POST /api/borrow` - Borrow a book (with quantity validation)
- `GET /api/borrow` - Get summary of borrowed books (with aggregation)

---

## 📥 Request & Response Samples

### ✅ Create Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}


### Get All Book
- GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

### Setup Instructions
- git clone https://github.com/Orinakter/Library_DB
cd Library_DB
- npm install
- npm run dev






