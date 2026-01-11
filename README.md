# StreamSafe – Video Upload, Sensitivity Processing & Streaming Platform

## Overview
**StreamSafe** is a full-stack web application that allows users to upload videos, process them for content sensitivity, receive real-time progress updates, and stream videos efficiently using HTTP range requests.
<!---
## Demo
# Demo Video: (Add demo video link here)
# Live Application: (Optional if deployed)

---
-->
## The application is designed with a 
- multi-tenant architecture, 
- role-based access control, and 
- real-time communication, 
- following clean code and modular architecture principles.

## Key Features
### Authentication & Authorization

- JWT-based authentication
- Role-Based Access Control (RBAC)
  - **Viewer** – View videos only
  - **Editor** – Upload and manage videos
  - **Admin** – Full access

### Video Upload & Management
- Secure video uploads using Multer
- File validation (type and size)
- Metadata storage in MongoDB
- Ownership-based access (multi-tenant isolation)

### Video Processing Pipeline
- Simulated sensitivity analysis (**Safe / Flagged**)
- Background processing
- Real-time progress updates using Socket.io
- Processing stages:
  - Uploaded → Processing → Completed

---

### Real-Time Updates
- Live progress bar updates
- Event-driven UI updates
- Socket.io-based communication

---

### Video Streaming
- HTTP Range Request–based streaming
- Supports seeking and partial loading
- Secure streaming (owner-only access)
- Prevents full-file downloads

---

### Video Dashboard
- Displays all uploaded videos
- Filter videos by:
  - Processing status
  - Sensitivity (Safe / Flagged)
- Integrated video player for completed videos

---

## Technology Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- Socket.io Client


### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io
- Multer

  ---

## Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/streamsafe-video-platform.git

```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

## Create a .env file:
```bash

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev

```

## Application Workflow

1. User registers and logs in
2. Editor/Admin uploads a video
3. Video processing starts automatically
4. Real-time progress updates are displayed
5. Video is classified as Safe or Flagged
6. Completed videos appear in the dashboard
7. User streams video securely

## Design Decisions & Assumptions

Sensitivity analysis is simulated to demonstrate processing pipelines without heavy ML dependencies

Local file storage is used for simplicity

MongoDB Atlas is used for scalability

Socket.io enables real-time feedback

Clean separation of concerns is maintained throughout the project
