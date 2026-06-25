# Auth App — Backend

A simple authentication backend built with **Node.js**, **Express**, and **MongoDB**. Supports user signup and login secured with **JWT (JSON Web Tokens)** and password hashing via **bcrypt**.

## Features

- User registration with hashed passwords
- Login with email and password
- JWT-based authentication
- Protected routes using auth middleware
- MongoDB for persistent user storage

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens (jsonwebtoken)
- **Password Hashing:** bcryptjs

## Project Structure

```
auth-app/
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   └── userSchema.js        # User schema
├── controllers/
│   └── authController.js   # Register / Login logic
├── middleware/
│   └── Auth.js             # JWT verification middleware
├── routes/
│   └── auth.js              # Auth routes
├── .env                     # Environment variables (not committed)
├── .gitignore
├── package.json
└── index.js                 # App entry point
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd auth-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

### 4. Run the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will start at `http://localhost:5000`.

## API Endpoints

Base URL: `/api/v1/auth`

| Method | Endpoint    | Description         | Auth Required |
|--------|-------------|----------------------|----------------|
| POST   | `/signup` | Create a new account | No             |
| POST   | `/login`    | Log in a user         | No             |

### Register

**POST** `/api/v1/auth/signup`

```json
{
  "name": "Prependra Singh",
  "email": "prependra@example.com",
  "password": "yourpassword"
}
```

**Response**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "...",
    "name": "Prependra Singh",
    "email": "prependra@example.com"
  },
  "message": "Account created successfully"
}
```

### Login

**POST** `/api/v1/auth/login`

```json
{
  "email": "prependra@example.com",
  "password": "yourpassword"
}
```

**Response**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "...",
    "name": "Prependra Singh",
    "email": "prependra@example.com"
  },
  "message": "Logged in successfully"
}
```

## Using the Token

For any protected route, include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Environment Variables Reference

| Variable          | Description                              |
|-------------------|-------------------------------------------|
| `PORT`            | Port the server runs on                   |
| `DATABASE_URL`    | MongoDB connection string                 |
| `JWT_SECRET`      | Secret key used to sign JWT tokens        |
| `JWT_EXPIRES_IN`  | Token expiry duration (e.g. `1d`, `7d`)   |

## License

This project is open source and available for personal and educational use.
