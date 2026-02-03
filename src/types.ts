export interface TokenPayload {
  oid: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
  roles?: string[];
  groups?: string[];
  [key: string]: any;
}

export interface User {
  oid: string;
  name?: string;
  username?: string;
}
