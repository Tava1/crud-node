const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')

const MongoClient = require('mongodb').MongoClient
const { ObjectID } = require('mongodb')

const uri = ""
const database = ""

MongoClient.connect(uri, (err, client) => {
  if (err)
    return console.log(err)
  db = client.db(database) // nome do banco

  app.listen(5000, () => {
    console.log('server is running: localhost:5000')
  })
})

// Adicionar o middleware body-parse ao app(express)
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(routes);