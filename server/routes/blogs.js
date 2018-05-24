const db = require("../db/models"); // initial sequelize model
const express = require("express");
const router = express.Router();
const Author = db.Author;
const Blog = db.Blog;


router.get('/', (req, res) => {
  db.Blog
    .findAll()
    .then(blogs => { res.status(200).json(blogs) })
    .catch(res.status(404).send('Does not exist!'))
})

router.get('/:id', (req, res) => {
  db.Blog
    .findById(req.params.id)
    .then(blog => { res.status(200).json(blog) })
})

router.get('/featured', (req, res) => {
  db.Blog
    .findAll({ where: { feature: true } })
    .then(blogs => { res.status(200).json(blogs) })
})

router.post('/', (req, res) => {
  db.Blog
    .create(req.body)
    .then(blog => { res.status(201).json(req.body) })
})

router.put('/:id', (req, res) => {
  db.Blog
    .save()
})

router.delete('/:id', (req, res) => {
  db.Blog
    .destroy()
})

module.exports = router;