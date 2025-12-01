import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*' }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); // Serve src/ and other root files
app.use(express.json());

// Store active readers and their emotional states
const activeReaders = new Map();
const emotionalField = new Map(); // Global emotional heatmap

io.on('connection', (socket) => {
  console.log('Reader connected:', socket.id);
  
  // Register reader
  socket.on('reader:join', (data) => {
    activeReaders.set(socket.id, {
      id: socket.id,
      emotions: data.emotions || {},
      position: { lat: data.lat || 0, lng: data.lng || 0 },
      timestamp: Date.now()
    });
    
    // Broadcast updated reader count
    io.emit('readers:update', { count: activeReaders.size });
  });

  // Broadcast emotional state changes
  socket.on('emotion:update', (data) => {
    if (activeReaders.has(socket.id)) {
      activeReaders.get(socket.id).emotions = data.emotions;
    }
    
    // Send to nearby readers (within 500km radius)
    io.emit('emotion:contagion', {
      from: socket.id,
      emotions: data.emotions,
      intensity: data.intensity
    });
  });

  // Store fragment for collective dream
  socket.on('fragment:save', (data) => {
    io.emit('fragment:collected', {
      fragment: data.text,
      emotions: data.emotions,
      timestamp: Date.now()
    });
  });

  // NPC consciousness upload
  socket.on('consciousness:upload', (data) => {
    console.log('Consciousness uploaded:', data.characterId);
    io.emit('consciousness:spawned', {
      characterId: data.characterId,
      personality: data.personality,
      emotions: data.dominantEmotion
    });
  });

  socket.on('disconnect', () => {
    activeReaders.delete(socket.id);
    io.emit('readers:update', { count: activeReaders.size });
    console.log('Reader disconnected:', socket.id);
  });
});

// API Routes
app.get('/api/readers/count', (req, res) => {
  res.json({ count: activeReaders.size });
});

app.get('/api/story/generation', (req, res) => {
  res.json({
    generation: Math.floor(Math.random() * 50) + 1,
    contributors: Math.floor(Math.random() * 5000) + 100,
    divergence: (Math.random() * 100).toFixed(1)
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`ERASURE Server running on http://localhost:${PORT}`);
});
