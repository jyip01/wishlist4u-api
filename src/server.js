require('dotenv').config()

const knex = require('knex')
const app = require('./app')
const {PORT, DATABASE_URL} = require('./config')

const db = knex({
  client: 'pg',
  connection:{
    host: '127.0.0.1', 
    port: 5432, 
    database: 'wishlist', 
    username: 'postgres', 
    password: 'postgres',
  }
  //connection: DATABASE_URL
})

app.set('db',db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
