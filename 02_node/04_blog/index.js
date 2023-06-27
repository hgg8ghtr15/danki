const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Noticias = require('./Noticias.js')

const app = express();
const ip = '127.0.0.1'
const port = 5000

// const url = `mongodb+srv://fabiolukascj:3WQg8vbbHOjt61VX@cluster0.j1tjy5t.mongodb.net/?retryWrites=true&w=majority`
const url = `mongodb+srv://fabiolukascj:3WQg8vbbHOjt61VX@cluster0.j1tjy5t.mongodb.net/database?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log(`Conecetado com sucesso!`)
}).catch((error) => {
  console.log(error.message)
})

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'))

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.query) //acessa '/?busca=teste'

  Noticias.find({})
    .then((noticias) => {
      console.log("teste")
      console.log(noticias)
    })
    .catch((err) => {
      console.log(err)
    })

  if (req.query.busca == null) {
    return res.render('index')
  } else {
    //acessa via http://127.0.0.1:5000/?busca=teste
    return res.send(`Rotorno a: ${req.query.busca}`)
  }
})

app.get("/noticia", (req, res) => {
  console.log(req.query) //acessa '/?busca=teste'
  return res.render('noticia')
})

app.get('/:slug', (req, res) => {
  return res.send(req.params.slug) //acessa via http://127.0.0.1:5000/sobre noticia
})

app.listen(port, () => {
  console.log(`Server iniciado em http://${ip}:${port}`)
})