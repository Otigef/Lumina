import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

const STATS_FILE = path.join(process.cwd(), 'stats.json');

function getStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading stats file:', err);
  }
  return { totalStudents: 1248 };
}

function saveStats(stats: { totalStudents: number }) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch (err) {
    console.error('Error saving stats file:', err);
  }
}

interface Room {
  clients: Set<WebSocket>;
}

const rooms: Record<string, Room> = {};
const globalClients = new Set<WebSocket>();

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  app.get('/api/stats', (req, res) => {
    res.json(getStats());
  });

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const lessonId = url.searchParams.get('lessonId');
    const isNewSession = url.searchParams.get('newSession') === 'true';

    globalClients.add(ws);

    if (isNewSession) {
      const stats = getStats();
      stats.totalStudents += 1;
      saveStats(stats);
      
      // Broadcast new count to all global clients
      const broadcastData = JSON.stringify({ type: 'stats_update', totalStudents: stats.totalStudents });
      globalClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(broadcastData);
        }
      });
    }

    if (lessonId) {
      if (!rooms[lessonId]) {
        rooms[lessonId] = { clients: new Set() };
      }
      rooms[lessonId].clients.add(ws);
      console.log(`Client connected to lesson: ${lessonId}`);
    }

    ws.on('message', (message) => {
      if (!lessonId) return;
      const code = message.toString();
      // Broadcast to all clients in the same room except the sender
      rooms[lessonId].clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(code);
        }
      });
    });

    ws.on('close', () => {
      globalClients.delete(ws);
      if (lessonId && rooms[lessonId]) {
        rooms[lessonId].clients.delete(ws);
        if (rooms[lessonId].clients.size === 0) {
          delete rooms[lessonId];
        }
      }
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error:`, error);
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();
