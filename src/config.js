module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://jessica_yip:1234@localhost/wishlist',
  /*host: '127.0.0.1', 
  port: 5432, 
  database: 'wishlist', 
  username: 'jyip', 
  password: '1234',*/
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}
