import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { config } from './config.js';
import debugRoute from './routes/debug.js';
import type { Variables } from './types.js';

const app = new Hono<{ Variables: Variables }>();

app.use('/*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.route('/api/debug', debugRoute);

const server = serve({ fetch: app.fetch, port: config.port }, () => {
  console.log(`Server started on port ${config.port}`);
});

process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
