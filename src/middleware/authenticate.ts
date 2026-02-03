import type { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';

export async function authenticate(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    const decoded = await verifyToken(token);
    c.set('token', decoded);
    await next();
  } catch (error: any) {
    return c.json({ error: 'Unauthorized', details: error.message }, 401);
  }
}
