StreamSafe – Video Upload, Sensitivity Processing & Streaming Platform

Overview

StreamSafe is a full-stack web application that allows users to upload videos, process them for content sensitivity, receive real-time progress updates, and stream videos efficiently using HTTP range requests.

The application is designed with a multi-tenant architecture, role-based access control, and real-time communication, following clean code and modular architecture principles.

Key Features
Authentication & Authorization

JWT-based authentication

Role-Based Access Control (RBAC)

Viewer – View videos only

Editor – Upload and manage videos

Admin – Full access

Video Upload & Management

Secure video uploads using Multer

File validation (type & size)

Metadata storage in MongoDB

Ownership-based access (multi-tenant isolation)

Video Processing Pipeline

Simulated sensitivity analysis (Safe / Flagged)

Background processing

Real-time progress updates using Socket.io

Processing stages:

Uploaded → Processing → Completed

Real-Time Updates

Live progress bar updates

Instant UI updates without page refresh

Event-based communication using Socket.io

Video Streaming

HTTP Range Request–based streaming

Supports seeking and partial loading

Secure streaming (owner-only access)

No full-file download

Video Dashboard

List all uploaded videos

Filter by:

Processing status

Sensitivity (Safe / Flagged)

Integrated video player for completed videos

Technology Stack
Frontend

React.js (Vite)

Tailwind CSS

Axios

Socket.io Client

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Socket.io

Multer

Architecture Overview
Frontend (React)
   │
   ├── Upload UI
   ├── Dashboard
   ├── Socket.io Client
   │
Backend (Node.js + Express)
   │
   ├── Auth APIs (JWT)
   ├── Video APIs
   ├── Socket.io Server
   ├── Video Processing Logic
   │
MongoDB Atlas
   ├── Users Collection
   └── Videos Collection

Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/<your-username>/streamsafe-video-platform.git
cd streamsafe-video-platform

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔄 Application Workflow

User registers & logs in

Editor/Admin uploads a video

Video processing starts automatically

Real-time progress updates are shown

Video is classified as Safe / Flagged

Completed videos appear in dashboard

User streams video securely

Design Decisions & Assumptions

Sensitivity analysis is simulated to demonstrate processing pipelines without heavy ML dependencies

Local file storage is used for simplicity

MongoDB Atlas is used for scalability

Socket.io enables real-time user feedback

Clean separation of concerns followed across backend & frontend

Security Considerations

Passwords are hashed using bcrypt

JWT tokens protect all private routes

Role-based authorization enforced

Video access restricted to owners only

Demo

Demo Video: (Add your demo video link here)

Live App: (Optional if deployed)