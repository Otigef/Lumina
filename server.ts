import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

interface Room {
  clients: Set<WebSocket>;
}

const rooms: Record<string, Room> = {};

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const lessonId = url.searchParams.get('lessonId');

    if (!lessonId) {
      ws.close(1008, 'Lesson ID is required');
      return;
    }

    if (!rooms[lessonId]) {
      rooms[lessonId] = { clients: new Set() };
    }
    rooms[lessonId].clients.add(ws);

    console.log(`Client connected to lesson: ${lessonId}`);

    ws.on('message', (message) => {
      const code = message.toString();
      // Broadcast to all clients in the same room except the sender
      rooms[lessonId].clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(code);
        }
      });
    });

    ws.on('close', () => {
      console.log(`Client disconnected from lesson: ${lessonId}`);
      if (rooms[lessonId]) {
        rooms[lessonId].clients.delete(ws);
        if (rooms[lessonId].clients.size === 0) {
          delete rooms[lessonId];
        }
      }
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error for lesson ${lessonId}:`, error);
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
