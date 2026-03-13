# DevVault Backend API

A secure, scalable REST API for managing and monitoring your coding projects. Built with Node.js, Express, and MongoDB.

## Features

✅ **CRUD Operations** - Create, read, update, and delete projects  
✅ **MongoDB Integration** - Persistent data storage with Mongoose ODM  
✅ **Health Monitoring** - Automatic health checks for live deployment URLs  
✅ **CORS Support** - Secure communication with React frontend  
✅ **Environment Configuration** - Secure management of sensitive variables  
✅ **Automatic Health Checks** - Runs every 30 minutes to monitor project status  

## Project Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your configuration
   # MONGODB_URI=your_mongodb_connection_string
   # PORT=5000
   ```

3. **Start the Server**
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Projects
```
GET /projects
```
**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "AI Chat Platform",
      "description": "Real-time chat application...",
      "repoUrl": "https://github.com/example/ai-chat",
      "liveUrl": "https://ai-chat-demo.vercel.app",
      "tags": ["React", "Node.js"],
      "status": "Production",
      "healthStatus": "Online",
      "lastChecked": "2024-03-13T10:30:00Z"
    }
  ]
}
```

#### 2. Get Single Project
```
GET /projects/:id
```

#### 3. Create New Project
```
POST /projects
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://myproject.com",
  "tags": ["React", "Node.js"],
  "status": "Production"
}
```

#### 4. Update Project
```
PATCH /projects/:id
Content-Type: application/json

{
  "status": "Beta",
  "tags": ["React", "MongoDB"]
}
```

#### 5. Delete Project
```
DELETE /projects/:id
```

#### 6. Check Single Project Health
```
GET /projects/:id/health
```
Performs an HTTP request to the project's liveUrl and updates health status.

#### 7. Check All Projects Health
```
POST /projects/health/check-all
```
Checks health status for all projects with live URLs.

#### 8. Server Health Check
```
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "DevVault Backend is running",
  "timestamp": "2024-03-13T10:30:00Z"
}
```

## Database Schema

### Project Model

```javascript
{
  title: String (required),
  description: String,
  repoUrl: String (required),
  liveUrl: String,
  tags: [String],
  status: Enum ['Production', 'Beta', 'In Progress', 'Archived'],
  healthStatus: Enum ['Online', 'Offline'],
  lastChecked: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Health Check System

The backend automatically:

1. **Checks health on startup** - Waits 5 seconds after server starts
2. **Checks every 30 minutes** - Runs periodic health checks for all projects with live URLs
3. **Updates status** - Sets `healthStatus` to "Online" or "Offline" based on HTTP response
4. **Tracks timestamps** - Records when the last check occurred in `lastChecked`

### Manual Health Check

```bash
# Check single project
curl http://localhost:5000/api/projects/{id}/health

# Check all projects
curl -X POST http://localhost:5000/api/projects/health/check-all
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## CORS Configuration

Frontend origins allowed by default:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (Alt port)

To change allowed origins, modify `FRONTEND_URL` in `.env`:
```env
FRONTEND_URL=http://localhost:3000,https://example.com
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/devvault` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Allowed CORS origins | `http://localhost:5173,http://localhost:5174` |

## Development

### Running Tests
```bash
# Coming soon
```

### Code Structure
```
backend/
├── config/          # Database and configuration files
│   └── db.js       # MongoDB connection logic
├── models/         # Mongoose schemas
│   └── Project.js  # Project model
├── controllers/    # Business logic
│   └── projectController.js
├── routes/         # API endpoints
│   └── projects.js
├── server.js       # Main server file
├── .env            # Environment variables
├── .env.example    # Example env file
└── package.json
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or provide a valid connection string
- Check `MONGODB_URI` in `.env`

### CORS Error
- Verify frontend URL in `.env` matches your frontend's actual URL
- Check browser console for specific CORS error details

### Health Check Failing
- Ensure the live URL is accessible from the server
- Check firewall and network connectivity
- Verify the URL is reachable with a browser

## Future Enhancements

- [ ] Authentication & Authorization
- [ ] Rate Limiting
- [ ] Project statistics and analytics
- [ ] Webhook support for GitHub updates
- [ ] Real-time notifications with WebSocket
- [ ] Advanced health check metrics
