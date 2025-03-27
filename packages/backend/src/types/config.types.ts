export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AuthConfig {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_EXPIRES_IN: string;
  REFRESH_EXPIRES_IN: string;
  COOKIE_MAX_AGE: number;
}

export interface JwtPayload {
  sub: number;
  username: string;
  email?: string;
  iat?: number;
  exp?: number;
}
