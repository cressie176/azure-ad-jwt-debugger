import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { config } from './config';
import debugRoute from './routes/debug';

const app = new Hono();

app.route('/api/debug', debugRoute);

const server = serve({ fetch: app.fetch, port: config.port }, () => {
  console.log(`Server started on port ${config.port}`);
});

process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
