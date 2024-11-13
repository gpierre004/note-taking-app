// src/server.ts
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { Pool } from 'pg';
import multer from 'multer';
import path from 'path';
import * as OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// WebSocket setup
const server = require('http').createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Types
interface Note {
  id: string;
  title: string;
  content: string;
  audio_url?: string;
  folder_id?: string;
  created_at: Date;
  updated_at: Date;
}

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('join-note', (noteId: string) => {
    socket.join(`note:${noteId}`);
  });

  socket.on('note-update', (data: { noteId: string, content: string }) => {
    socket.to(`note:${data.noteId}`).emit('note-updated', data);
  });
});

// API Routes
// Create new note
app.post('/api/notes', async (req, res) => {
  try {
    const { title, content, folder_id } = req.body;
    const result = await pool.query(
      'INSERT INTO notes (title, content, folder_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, folder_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Upload audio and transcribe
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Transcribe audio using OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: await fetch(req.file.path),
      model: "whisper-1",
    });

    res.json({ transcription: transcription.text });
  } catch (error) {
    res.status(500).json({ error: 'Transcription failed' });
  }
});

// Get notes with search and filters
app.get('/api/notes', async (req, res) => {
  try {
    const { search, folder_id, tag } = req.query;
    let query = 'SELECT * FROM notes WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (title ILIKE $1 OR content ILIKE $1)';
      params.push(`%${search}%`);
    }

    if (folder_id) {
      query += ` AND folder_id = $${params.length + 1}`;
      params.push(folder_id);
    }

    if (tag) {
      query += ` AND id IN (SELECT note_id FROM note_tags WHERE tag_id = $${params.length + 1})`;
      params.push(tag);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});