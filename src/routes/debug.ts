import { Hono } from 'hono';
import { authenticate } from '../middleware/authenticate';

const debug = new Hono();

debug.post('/token', authenticate, async (c) => {
  const token = c.get('token');

  console.log(JSON.stringify(token, null, 2));

  return c.json({
    authenticated: true,
    token,
  });
});

export default debug;
