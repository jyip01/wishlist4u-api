module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost/wishlist',
  host: '127.0.0.1', 
  port: 5432, 
  database: 'wishlist', 
  username: 'postgres', 
  password: 'postgres',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}
