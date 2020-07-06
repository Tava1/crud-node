const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
const { ObjectID } = require('mongodb')

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

app.get('/', (req, res) => {
  res.render('index.ejs') // Dizendo para o servidor renderizar a página, qual for solicidada a rota raiz
})

// :READ
app.get('/show', (req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err)
      return console.log(err)
    res.render('show.ejs', { data: results })
  })
})
// :CREATE
app.post('/show', (req, res) => {
  db.collection('data').insertOne(req.body, (err, result) => {
    if (err)
      return console.log(err)

    console.log('Dados foram registrados no banco de dados com sucesso!')
    res.redirect('/')
  })
})

// :UPDATE
app.route('/edit/:id')
  .get((req, res) => {
    let id = req.params.id

    db.collection('data').find(ObjectID(id)).toArray((err, result) => {
      if (err)
        return console.log(err)
      res.render('edit.ejs', { data: result })
    })
  })
  .post((req, res) => {
    let id = req.params.id
    let name = req.body.name
    let lastname = req.body.lastname

    db.collection('data').updateOne({ _id: ObjectID(id) }, {
      $set: {
        name: name,
        lastname: lastname
      }
    }, (err, result) => {
      if (err)
        return console.log(err)
      res.redirect('/show')
      console.log('Dado atualizado com sucesso!')
    })
  })

// :DELETE
app.route('/delete/:id')
  .get((req, res) => {
    let id = req.params.id

    db.collection('data').deleteOne({ _id: ObjectID(id) }, (err, result) => {
      if (err)
        return console.log(err)
      res.redirect('/show')
      console.log('Dado deletado com sucesso!')
    })
  })


