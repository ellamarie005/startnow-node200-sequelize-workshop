const express = require('express');
const router = express.Router();
const Author = require('../db/models/author');

router.get('/', (req, res) => {
  Author
    .findAll()
    .then(authors => { res.status(200).json(authors) })
});

router.get('/:id', (req, res) => {
  Author
    .findByID(req.params.id)
    .then(authors => {
      if (authors) return res.status(200).json(authors);
      else return res.status(404).send('Author does not exist')
    })
});

router.get('/:id/blogs', (req, res) => {
  Author
    .findAll({ where: { authorId: req.params.id } })
    .then()
    .catch(console.error)
});

router.post('/', (req, res) => {
  let author = new Author(req.body);
  Author
    .create(err => {
      if (err) { return res.status(404).send(err) }
      else { return res.status(201).json(author) }
    })
    .catch(console.error)
});

router.put('/:id', (req, res) => {
  Author
    .update(req.params.id)
    .then(() => console.log('Updated the author!'))
    .catch(console.error);
});

router.delete('/:id', (req, res) => {
  Author
    .findById(req.params.id)
    .then(author => {
      return author.destroy();
    })
    .then(() => console.log('Car deleted'))
    .catch(console.error);

});

module.exports = router;