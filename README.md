# AskGAI -- Full Stack AI Chat Application

AskGAI is a full-stack AI-powered chat application built with **React
(frontend)** and **Node.js + Express + MongoDB (backend)**.\
It supports user authentication, memory management (short-term and
long-term), and advanced RAG (Retrieval Augmented Generation).

------------------------------------------------------------------------

## 🚀 Features

-   🔑 **User Authentication** (JWT + Cookies)
-   💬 **AI Chat** with **short-term** (per-session) memory
-   🧠 **Long-Term Memory** stored in MongoDB (user-specific)
-   📚 **RAG (Retrieval Augmented Generation)** -- fetches context from
    stored documents
-   🪐 **Pinecone** integration for semantic search and vector storage
-   🎨 **Frontend in React** with responsive design
-   🌙 **Light/Dark Theme Support**
-   ⚡ **Backend with Node.js + Express**
-   🗄️ **MongoDB Atlas** (cloud database)
-   🔗 **REST API Integration**
-   🔒 **Secure Cookies & JWT Authentication**

------------------------------------------------------------------------

## 🖥️ Frontend (React + Vite)

-   Built with **React** + **Vite** for fast development
-   **Axios** for API requests
-   **React Router** for navigation
-   **Context API / Redux** for state management
-   **CSS (SCSS/Tailwind)** for styling
-   **Theme toggle** (light/dark mode)
-   **Responsive mobile-first design**

### Frontend Commands

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## ⚙️ Backend (Node.js + Express + MongoDB + Pinecone)

-   **Express.js** -- REST API framework
-   **Mongoose** -- ODM for MongoDB
-   **JWT (JSON Web Tokens)** -- authentication & authorization
-   **bcrypt.js** -- password hashing
-   **dotenv** -- environment variables
-   **cookie-parser** -- secure cookie storage
-   **CORS** -- cross-origin requests
-   **OpenAI API (or other LLMs)** -- AI chat integration
-   **Pinecone** -- vector database for semantic search

### Backend Commands

``` bash
cd backend
npm install
npm run dev
```

------------------------------------------------------------------------

## 🧠 Memory System

### 🔹 Short-Term Memory

-   Stored **in session (React Context/Redux)** or server-side cache.
-   Keeps track of **recent conversation** for natural context.

### 🔹 Long-Term Memory

-   Stored in **MongoDB** linked to the user.
-   Allows **personalized experiences** across sessions.

### 🔹 Retrieval Augmented Generation (RAG)

-   Stores documents, embeddings, and vector search indexes.
-   Uses **Pinecone / Weaviate / FAISS** (optional) or MongoDB for
    semantic search.
-   Provides **relevant context** to the LLM during queries.

------------------------------------------------------------------------

## 🔑 Authentication Flow

1.  User logs in → Server validates credentials.
2.  Server issues **JWT token** → stored in **HTTP-only cookies**.
3.  Client uses token for API requests.
4.  Token is verified on each request for security.

------------------------------------------------------------------------

## 🛠️ Tools & Libraries

### Frontend

-   React + Vite
-   Axios
-   React Router
-   Context API / Redux
-   TailwindCSS / SCSS

### Backend

-   Node.js + Express
-   MongoDB + Mongoose
-   JWT + bcrypt.js
-   dotenv
-   cookie-parser
-   OpenAI SDK
-   Pinecone

------------------------------------------------------------------------

## ⚡ Setup Instructions

### 1. Clone the repo

``` bash
git clone https://github.com/MuhammadJawadSaeed/askgai.git
cd askgai
```

### 2. Environment Variables

Create a `.env` file inside **backend**:

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
```

### 3. Start Backend

``` bash
cd backend
npm install
npm run dev
```

### 4. Start Frontend

``` bash
cd frontend
npm install
npm run dev
```

### 5. Access App

Go to → <http://localhost:5173>

### 6. API Testing

You can test the backend APIs using [Postman](https://www.postman.com/ai-chatbot-7904/workspace/askgai/request/43507636-1bc613bc-ea35-444b-b121-875af8d8867e?action=share&creator=43507636).

--------------------------------------------------------------------------
