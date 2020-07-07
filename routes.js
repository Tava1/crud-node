const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  res.render('index.ejs') // Dizendo para o servidor renderizar a página, qual for solicidada a rota raiz
})

// :READ
routes.get('/show', (req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err)
      return console.log(err)
    res.render('show.ejs', { data: results })
  })
})
// :CREATE
routes.post('/show', (req, res) => {
  db.collection('data').insertOne(req.body, (err, result) => {
    if (err)
      return console.log(err)

    console.log('Dados foram registrados no banco de dados com sucesso!')
    res.redirect('/')
  })
})

// :UPDATE
routes.route('/edit/:id')
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
routes.route('/delete/:id')
  .get((req, res) => {
    let id = req.params.id

    db.collection('data').deleteOne({ _id: ObjectID(id) }, (err, result) => {
      if (err)
        return console.log(err)
      res.redirect('/show')
      console.log('Dado deletado com sucesso!')
    })
  })

module.exports = routes