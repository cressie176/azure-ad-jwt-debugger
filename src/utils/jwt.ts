import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import type { TokenPayload } from '../types';

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${config.tenantId}/discovery/v2.0/keys`,
});

async function getKey(header: jwt.JwtHeader): Promise<string> {
  if (!header.kid) {
    throw new Error('Token header missing kid (key ID)');
  }
  const key = await client.getSigningKey(header.kid);
  return key.getPublicKey();
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: config.clientId,
        issuer: `https://login.microsoftonline.com/${config.tenantId}/v2.0`,
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as TokenPayload);
        }
      },
    );
  });
}
