import { Hono } from 'hono';
import { authenticate } from '../middleware/authenticate.js';
import type { Variables } from '../types.js';

const debug = new Hono<{ Variables: Variables }>();

debug.post('/token', authenticate, async (c) => {
  const token = c.get('token');
  const authHeader = c.req.header('Authorization');
  const bearerToken = authHeader?.substring(7);

  console.log('Bearer Token:', bearerToken);
  console.log('Decoded Token:', JSON.stringify(token, null, 2));

  return c.json({
    authenticated: true,
    token,
  });
});

export default debug;
