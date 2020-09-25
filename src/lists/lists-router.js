const express = require('express');
const ListsService = require('./lists-service');
const path = require('path')
const { requireAuth } = require('../middleware/jwt-auth');

const listsRouter = express.Router()
const jsonBodyParser = express.json()

listsRouter
  .route('/')
  .get((req, res, next) => {
    console.log(req.app.get('db').client.connectionSettings)
    ListsService.getAllLists(req.app.get('db'))
      .then(lists => {
        res.json(ListsService.serializeLists(lists))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { list_title, list_description, user_id } = req.body
    const newList = { list_title, list_description, user_id }

    for(const [key, value] of Object.entries(newList))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    return ListsService.insertList(
      req.app.get('db'),
      newList
    )
    .then(list => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${list.id}`))
        .json(ListsService.serializeList(list))
    })
    .catch(next)
  })
  

listsRouter
  .route('/:list_id')
  .all(requireAuth)
  .all(checkListExists)
  .get((req, res, next) => {
    ListsService.getById(
      req.app.get('db'),
      req.params.list_id
    )
    .then(list=>{
      res.json(ListsService.serializeList(list))
    })
    .catch((error)=>{
      console.log(error)
      next()
    })
  })
  //patch request??
  .delete((req, res, next) => {
    ListsService.deleteList(
      req.app.get('db'),
      req.params.list_id
    )
    .then(/*_numRowsAffected*/lists => {
      res
        .status(204)
        .end()
    })
    .catch(next)
  })

listsRouter
  .route('/:list_id/wishes/')
  .all(requireAuth)
  .all(checkListExists)
  .get((req, res, next) => {
      ListsService.getWishesForList(
          req.app.get('db'),
          req.params.list_id
      )
        .then(wishes => {
            res.json(ListsService.serializeWishLists(wishes))
        })
        .catch(next)
  })

listsRouter
  .route('/users/:user_id')
  //get all lists that were posted by a specific user
  //.all(requireAuth)
  //.all(checkListExists)
  .get((req, res, next) => {
    ListsService.getByUserId(
      req.app.get('db'),
      req.params.user_id
    )
      .then(lists => {
        //res.json(lists.map(ListsService.serializeWishLists))
        res.json(lists)
      })
      .catch(next)
  })

async function checkListExists(req, res, next) {
    try {
        console.log('middleware')
        const list = await ListsService.getById(
            req.app.get('db'),
            req.params.list_id
        )

        if(!list)
          return res.status(404).json({
              error: `List doesn't exist`
          })

        res.list = list
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = listsRouter;