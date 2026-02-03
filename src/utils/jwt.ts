import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import type { TokenPayload } from '../types.js';

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${config.tenantId}/discovery/v2.0/keys`,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  if (!header.kid) {
    const error = new Error('Token header missing kid (key ID)');
    return callback(error);
  }

  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const publicKey = key!.getPublicKey();
    callback(null, publicKey);
  });
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Token verification timeout'));
    }, 10000);

    jwt.verify(
      token,
      getKey,
      {
        audience: config.clientId,
        issuer: [
          `https://sts.windows.net/${config.tenantId}/`,
          `https://login.microsoftonline.com/${config.tenantId}/v2.0`,
        ],
      },
      (err, decoded) => {
        clearTimeout(timeout);
        if (err) {
          reject(err);
        } else {
          resolve(decoded as TokenPayload);
        }
      },
    );
  });
}
