# AI Blog Generator

## Project Overview
This project is a full-stack web application that allows users to generate and manage blog posts. It's built using the MERN stack (MongoDB, Express, React, Node.js) and integrates with OpenAI's API(GPT-3.5-turbo) for content generation.

## Features
- Generate blog posts using AI
- View all generated blog posts
- Search posts by title
- Edit existing posts
- Delete posts

## Technologies Used
- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- AI Integration: OpenAI API
- Additional: TypeScript (for backend)

## Setup and Installation
1. Clone the repository
   ```
   git clone https://github.com/lrao01-su/llm-blog-platform.git
   cd llm-blog-platform
   ```

2. Install dependencies
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables
   Create a `.env` file in the server directory with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5001
   ```

4. Start the backend server
   ```
   cd server && npm run dev
   ```

5. Start the frontend application
   ```
   cd client && npm start
   ```

6. Open `http://localhost:3000` in your browser

## API Endpoints
- GET `/api/posts`: Fetch all posts
- POST `/api/posts/generate`: Generate a new post
- PUT `/api/posts/:id`: Update a post
- DELETE `/api/posts/:id`: Delete a post
- GET `/api/posts/search`: Search posts by title

## Future Improvements
- User authentication
- Adjustable blog post generator, by tone/ word count/ context


## Demo
https://www.loom.com/share/82b9f677b47f4fd3bc8779cb107e16b9?sid=a1d33d14-b1ee-44fe-994b-10f78fba3ff9


