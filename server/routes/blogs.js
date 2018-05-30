const express = require("express");
const router = express.Router();
const db = require("../db/models"); // initial sequelize model

router.get('/', (req, res) => {
  db.Blog
    .findAll()
    .then(blogs => { res.status(200).json(blogs) })
})

router.get('/featured', (req, res) => {
  db.Blog
    .findAll({ where: { featured: true } })
    .then(blogs => {
      console.log(blogs);
      res.status(200).json(blogs)
    })
});

router.get('/:id', (req, res) => {
  db.Blog
    .findById(req.params.id)
    .then(blog => {
      if (blog) { res.status(200).json(blog) }
      else { res.status(404).send('Blog is not here!') }
    })
})

//not passing... test is erased.
router.post('/', (req, res) => {
  let newBlog = req.body;
  newBlog.authorId = req.query.authorId;
  db.Blog
    .create(newBlog)
    .then(blogs => {res.status(201).json(blogs)});
});

router.put('/:id', (req, res) => {
  db.Blog
    .update(req.body, { where: { id: req.params.id } })
    .then(blog => { res.status(204).json(blog) })
})

router.delete('/:id', (req, res) => {
  if (req.params.id) {
    db
      .Blog
      .destroy({ where: { id: req.params.id } })
      .then(res.status(200).send('Blog is now deleted'))
  }
})

module.exports = router;