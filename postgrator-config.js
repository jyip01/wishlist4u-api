require('dotenv').config();

const config = require('./src/config');

console.log(config.DATABASE_URL, '#######')

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "role": "jyip",
  "db": "wishlist_test", 
  /*"connectionString": (process.env.NODE_ENV === 'test')
    ? "postgresql://jyip:1234@localhost/wishlist_test"
    : "postgresql://jessica_yip:1234@localhost/wishlist",*/
   
    "connectionString": (process.env.NODE_ENV === 'test') 
    ? config.TEST_DATABASE_URL 
    : config.DATABASE_URL,
}