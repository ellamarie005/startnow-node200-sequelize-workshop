const db = require("../db/models"); // initial sequelize model
const express = require("express");
const router = express.Router();

//passed
router.get('/', (req, res) => {
  db.Author
    .findAll()
    .then(authors => { res.status(200).json(authors) })
});

//passed
router.get('/:id', (req, res) => {
  db.Author
    .findById(req.params.id)
    .then(author => { 
      if (author) {res.status(200).json(author)}
      else {res.status(404).send('Author does not exist!')}
    })
});


router.get('/:id/blogs', (req, res) => {
  db.Blog
    .findAll({ where: { authorId: req.params.id } })
    .then(blogs => {res.status(200).json(blogs)})
});

router.post('/', (req, res) => {
  db.Author
    .create(req.body)
    .then(user => {res.status(201).json(user)})
});

router.put('/:id', (req, res) => {
  db.Author
    .update(req.body,{where: {id: req.params.id}})
    .then(author => {res.status(204).json(author)})
});

router.delete('/:id', (req, res) => {
  if (req.params.id) {
   db
   .Author
   .destroy({where: {id: req.params.id}})
   .then(res.status(200).send('Author is now deleted'))}
});

module.exports = router;