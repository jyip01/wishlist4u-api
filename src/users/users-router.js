const express = require('express')
const path = require('path')
const UsersService = require ('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const { preferred_name, user_name, password } = req.body

    for (const field of ['preferred_name', 'user_name', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError})

    UsersService.hasUserWithUserName(
        req.app.get('db'),
        user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username: ${user_name} is already taken`})    
        
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
              const newUser = {
                  preferred_name,
                  user_name,
                  password: hashedPassword,
                  signup_date: 'now()',
              }

              return UsersService.insertUser(
                  req.app.get('db'),
                  newUser
              )
                .then(user => {
                    res
                      .status(201)
                      .location(path.posix.join(req.originalUrl, `/${user.id}`))
                      .json(UsersService.serializeUser(user))
                })
          })
      })
      .catch(next)
  })

module.exports = usersRouter;