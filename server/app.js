const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');

/* sequelize configuration */
db.sequelize.sync();

const app = express();

app.use(bodyParser.json());

app.use('/api/authors', require('./routes/authors'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send('YO YO YOOOOO!');
});
module.exports = app;