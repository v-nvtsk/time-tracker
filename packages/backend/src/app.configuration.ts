export const configuration = () => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'some_very_secret_string',
    jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600', 10),
  },

  database: {
    frontendOrigin: process.env.FRONT_ORIGIN || 'http://localhost:5173',

    host: process.env.TIME_TRACKER_DB_HOST || 'localhost',
    port: parseInt(process.env.TIME_TRACKER_DB_PORT || '5432', 10),
    username: process.env.TIME_TRACKER_DB_USER || 'time_tracker',
    password: process.env.TIME_TRACKER_DB_PASSWORD || 'db_password',
    database: process.env.TIME_TRACKER_DB_NAME || 'time_tracker',
    type: 'postgres' as const,
  },

  platform: {
    prefix: process.env.API_PREFIX || 'api',
    version: process.env.API_VERSION || 'v1',
  },
});
