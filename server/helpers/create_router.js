const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const createRouter = function(collection){
  const router = express.Router()

  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err});
    });
  });
  router.get('/:id', (req, res) =>{
    const id = req.params.id;
    collection.findOne({_id: ObjectID(id)})
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err});
    });
  });
  router.post('/', (req, res) => {
    collection.insertOne(req.body)
    .then((result) => res.json(result.ops[0]))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err});
    });
  });
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({_id: ObjectID(id)})
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err});
    });
  })
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOneAndUpdate({_id: ObjectID(id)},
    {$set: req.body},
    {returnOriginal: false}
)
    .then((result) => res.json(result.value))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err});
    });
  })


  return router
}

module.exports = createRouter
