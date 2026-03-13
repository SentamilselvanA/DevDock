# DevVault Setup Guide - Fixed Version

## Changes Made

### 1. **MongoDB Connection Fix**
- Enhanced connection with retry logic (up to 5 attempts)
- Added proper error handling and connection timeout settings
- File: `backend/config/db.js`

### 2. **Authentication System Added**
- **User Model** (`backend/models/User.js`):
  - Username & email validation
  - Password hashing with bcryptjs
  - Password comparison method

- **Auth Controller** (`backend/controllers/authController.js`):
  - Register endpoint: `/api/auth/register`
  - Login endpoint: `/api/auth/login`
  - Get current user: `/api/auth/me`

- **Auth Middleware** (`backend/middleware/authMiddleware.js`):
  - JWT token verification
  - User ID extraction from token

- **Auth Routes** (`backend/routes/auth.js`):
  - Public: Register & Login
  - Protected: Get current user

### 3. **Project-User Association**
- Updated Project model to include `userId` field
- All project operations now filtered by user
- Projects are securely segregated per user
- File: `backend/models/Project.js`

### 4. **Frontend Updates**
- **App.jsx**: Now uses `useProjects` hook with proper API calls
- **useProjects Hook**: Updated with auth headers and token management
- **LoginModal**: Complete login/register UI with form validation
- **Header**: Added user profile menu with logout functionality
- **VaultCard**: Updated to use MongoDB `_id` field

### 5. **Dependencies Added**
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token generation and verification

---

## Installation & Setup

### Backend Setup
```bash
cd backend

# Install new dependencies
npm install bcryptjs jsonwebtoken

# Ensure MongoDB is running locally OR set MongoDB Atlas URI
# The app now has retry logic for connection failures

# Update .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/devvault
# JWT_SECRET=your-secret-key-change-in-production-env
```

### Frontend Setup
```bash
# Install dependencies (if not already done)
npm install

# Start the dev server
npm run dev
```

### Running the Application

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```

#### Terminal 2 - Start Frontend
```bash
npm run dev
```

---

## How It Works Now

### User Flow
1. **First Time Users**: Click "Sign Up" on login screen
   - Enter username, email, password
   - Account is created and you're automatically logged in

2. **Returning Users**: Click "Login"
   - Enter email and password
   - Token is stored in localStorage

3. **Add Projects**: Once logged in
   - Click "+ Add Project" button
   - Enter project details
   - Projects are saved to database and associated with your user account

4. **Data Persistence**
   - Reload the page → projects remain (stored in MongoDB)
   - Logout → projects are hidden
   - Login with another account → see only your projects

5. **Logout**
   - Click user profile icon (U) in header
   - Click "Logout" → clears token and returns to login screen

---

## Key Fixes

### Problem 1: Projects Erased on Reload
**Root Cause**: Local state was not persisted to backend
**Solution**: 
- App now fetches projects from MongoDB on mount
- All CRUD operations go through API
- Projects persist across sessions

### Problem 2: Potential MongoDB Connection Issues
**Solution**:
- Added retry logic with 5 attempts
- 2-second delay between retries
- Better error messages

### Problem 3: No Authentication
**Solution**:
- Complete JWT-based auth system
- Secure password hashing
- Protected API routes
- Token stored in localStorage

---

## Database Schema

### User Collection
```
{
  username: String (unique, 3-30 chars),
  email: String (unique, validated),
  password: String (hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Collection
```
{
  userId: ObjectId (references User),
  title: String (required, max 100),
  description: String,
  repoUrl: String (required, valid URL),
  liveUrl: String,
  tags: [String],
  status: String (Production/Beta/In Progress/Archived),
  healthStatus: String (Online/Offline),
  lastChecked: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Projects (All require authentication token)
- `GET /api/projects` - Get user's projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/health` - Check project health
- `POST /api/projects/health/check-all` - Check all projects health

---

## Environment Variables

Create/Update `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/devvault
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173,http://localhost:5174
JWT_SECRET=your-secret-key-change-in-production-env
```

---

## Troubleshooting

### MongoDB Connection Fails
1. Ensure MongoDB is running locally:
   ```bash
   mongod
   ```
2. OR use MongoDB Atlas and set `MONGODB_URI` to your connection string

### Login Shows Error "User not found"
- Check email/password are correct
- Ensure MongoDB connection works
- Check backend console for detailed error

### Projects Not Saving
- Verify auth token is in localStorage
- Check network tab for API errors
- Ensure backend is running on port 5000

### Frontend Shows "Loading projects..."
- Wait for backend to connect to MongoDB
- Check `http://localhost:5000/api/health` is accessible
- Check browser console for errors

---

## Production Deployment Tips

1. **Change JWT_SECRET**: Don't use default secret in production
2. **Use MongoDB Atlas**: For hosted MongoDB service
3. **Set NODE_ENV=production**
4. **Use HTTPS**: For secure token transmission
5. **Enable CORS**: Set `FRONTEND_URL` to your actual domain

---

## File Structure
```
backend/
├── config/
│   └── db.js          (MongoDB connection with retry logic)
├── controllers/
│   ├── authController.js  (New auth logic)
│   └── projectController.js (Updated with userId filtering)
├── middleware/
│   └── authMiddleware.js   (New JWT verification)
├── models/
│   ├── User.js        (New user schema)
│   └── Project.js     (Updated with userId)
├── routes/
│   ├── auth.js        (New auth routes)
│   └── projects.js    (Updated with auth middleware)
├── server.js          (Updated with auth routes)
├── package.json       (Added bcryptjs, jsonwebtoken)
└── .env              (Updated with JWT_SECRET)

src/
├── App.jsx            (Updated to use useProjects hook)
├── components/
│   ├── LoginModal.jsx (New login/register UI)
│   ├── Header.jsx     (Added logout functionality)
│   └── VaultCard.jsx  (Updated to use _id)
└── hooks/
    └── useProjects.js (Updated with auth headers)
```

---

## Next Steps

1. Install new dependencies in backend
2. Ensure MongoDB is running
3. Start backend server
4. Start frontend server
5. Register a new user account
6. Add your first project
7. Reload page - project should still be there!

Done! Your DevVault now has persistent data storage and authentication.
