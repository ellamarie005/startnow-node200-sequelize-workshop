const express = require('express');
const router = express.Router();
const Author = require('../db/models/author');
const Blog = require('../db/models/blog');


router.get('/', (req, res) => {
Blog
  .findAll()
  .then(blogs => {res.status(200).json(blogs)})
  .catch(res.status(404).send('Does not exist!'))
})

router.get('/:id', (req, res) => {
Blog
  .findById(req.params.id)
  .then(blog => {
    res.status(200).json(blog)
  })
})

router.get('/featured', (req, res) => {
Blog
  .findAll({ where: {feature: true}})
  .then()
})

router.post('/', (req, res) => {
Blog
  .create(req.body)
  .then(blog => {
    res.status(201).json(req.body)
  })
})

router.put('/:id', (req, res) => {
Blog
  .save()
})

router.delete('/:id', (req, res) => {
Blog
  .destroy()
})

module.exports = router;