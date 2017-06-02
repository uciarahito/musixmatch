const express = require('express')
const app = express()
const index = require('./routes/index')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// NOTE: connect to DB
mongoose.connect('mongodb://localhost/musixmatch')

// NOTE: spesial
app.use(cors())

// NOTE: set
app.set('port', process.env.PORT || 3000)

// NOTE: use
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/', index)

// NOTE: listen
app.listen(app.get('port'), () => {
  console.log('Listening on port '+ app.get('port'));
})