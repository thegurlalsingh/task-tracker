
# Task Tracker - Full Stack MERN Application

A simple task tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (signup and login)
- Create, read, update, and delete tasks
- Filter tasks by completion status and priority
- Celebration modal when all tasks are completed

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   If you're running MongoDB locally, you can use:
   ```
   MONGO_URI=mongodb://localhost:27017/tasktracker
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Start the React application:
   ```bash
   npm run dev
   ```

## API Routes

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Tasks
- GET /api/tasks - Get all tasks for logged in user
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Technologies Used
- MongoDB - Database
- Express - Backend framework
- React - Frontend library
- Node.js - JavaScript runtime
- JWT - Authentication
- Tailwind CSS - Styling
