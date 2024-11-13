# Project Structure

## Root Directory
```
note-taking-app/
├── client/            # Frontend React application
├── server/            # Backend Express application
├── .gitignore
├── docker-compose.yml
├── README.md
└── package.json
```

## Frontend Structure (client/)
```
client/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── audio/
│   │   │   ├── AudioRecorder.tsx
│   │   │   └── WaveformVisualizer.tsx
│   │   ├── editor/
│   │   │   ├── NoteEditor.tsx
│   │   │   └── MarkdownEditor.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── notes/
│   │   │   ├── NoteList.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   └── NoteSearch.tsx
│   │   ├── folders/
│   │   │   ├── FolderTree.tsx
│   │   │   └── FolderCreate.tsx
│   │   ├── tags/
│   │   │   ├── TagManager.tsx
│   │   │   └── TagSelect.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── hooks/
│   │   ├── useAudioRecorder.ts
│   │   ├── useNotes.ts
│   │   ├── useFolders.ts
│   │   ├── useTags.ts
│   │   ├── useWebSocket.ts
│   │   └── useTheme.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── WebSocketContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── noteService.ts
│   │   ├── folderService.ts
│   │   ├── tagService.ts
│   │   └── websocket.ts
│   ├── utils/
│   │   ├── audio.ts
│   │   ├── markdown.ts
│   │   ├── export.ts
│   │   └── validation.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Backend Structure (server/)
```
server/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── websocket.ts
│   │   └── storage.ts
│   ├── controllers/
│   │   ├── noteController.ts
│   │   ├── folderController.ts
│   │   ├── tagController.ts
│   │   ├── authController.ts
│   │   └── transcriptionController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── error.ts
│   │   ├── upload.ts
│   │   └── validation.ts
│   ├── models/
│   │   ├── Note.ts
│   │   ├── Folder.ts
│   │   ├── Tag.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── noteRoutes.ts
│   │   ├── folderRoutes.ts
│   │   ├── tagRoutes.ts
│   │   └── authRoutes.ts
│   ├── services/
│   │   ├── noteService.ts
│   │   ├── transcriptionService.ts
│   │   ├── exportService.ts
│   │   └── websocketService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validation.ts
│   │   └── errors.ts
│   ├── types/
│   │   └── index.ts
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
└── nodemon.json
```

# Dependencies

## Frontend Dependencies (client/package.json)
```json
{
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@hookform/resolvers": "^3.3.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-toast": "^1.1.5",
    "@tanstack/react-query": "^5.8.4",
    "axios": "^1.6.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-markdown": "^9.0.1",
    "react-router-dom": "^6.19.0",
    "socket.io-client": "^4.7.2",
    "tailwind-merge": "^2.0.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4",
    "zustand": "^4.4.6"
  },
  "devDependencies": {
    "@types/node": "^20.9.2",
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.11.0",
    "@typescript-eslint/parser": "^6.11.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

## Backend Dependencies (server/package.json)
```json
{
  "dependencies": {
    "@aws-sdk/client-s3": "^3.454.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "openai": "^4.17.4",
    "pg": "^8.11.3",
    "socket.io": "^4.7.2",
    "winston": "^3.11.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.16",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/morgan": "^1.9.9",
    "@types/multer": "^1.4.10",
    "@types/node": "^20.9.2",
    "@types/pg": "^8.10.9",
    "@typescript-eslint/eslint-plugin": "^6.11.0",
    "@typescript-eslint/parser": "^6.11.0",
    "eslint": "^8.53.0",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  }
}
```

## Environment Variables

### Frontend (.env.example)
```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
VITE_STORAGE_URL=http://localhost:3000/uploads
```

### Backend (.env.example)
```
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notetaking
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket-name

# Redis (for WebSocket scaling)
REDIS_URL=redis://localhost:6379
```

# Key Features by Module

## Frontend Modules

1. **Audio Module**
   - Real-time audio recording
   - Waveform visualization
   - Audio playback controls

2. **Editor Module**
   - Rich text editing
   - Markdown support
   - Real-time collaboration

3. **Note Management**
   - CRUD operations
   - Search and filtering
   - Tags and folders organization

4. **UI Components**
   - Themed components using shadcn/ui
   - Responsive layouts
   - Loading states and animations

## Backend Modules

1. **API Layer**
   - RESTful endpoints
   - Request validation
   - Error handling

2. **Audio Processing**
   - File upload handling
   - OpenAI Whisper integration
   - Audio storage management

3. **Data Management**
   - PostgreSQL queries
   - Data validation
   - Caching layer

4. **Real-time Features**
   - WebSocket connections
   - Collaborative editing
   - Event broadcasting

# Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` in both client and server directories
3. Install dependencies:
   ```bash
   # Root directory
   npm install
   
   # Client
   cd client
   npm install
   
   # Server
   cd server
   npm install
   ```
4. Start development servers:
   ```bash
   # Client
   npm run dev
   
   # Server
   npm run dev
   ```

# Production Deployment

1. Build the applications:
   ```bash
   # Client
   cd client
   npm run build
   
   # Server
   cd server
   npm run build
   ```

2. Deploy using Docker:
   ```bash
   docker-compose up -d
   ```