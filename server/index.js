const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cors_proxy = require('cors-anywhere');

const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = 5000

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', movieRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))