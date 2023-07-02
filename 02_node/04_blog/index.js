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

  if (req.query.busca == null) {
    Noticias.find().sort({ "_id": -1 })
      .then((noticias) => {
        return res.render('index', { noticias: noticias })
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    //acessa via http://127.0.0.1:5000/?busca=teste
    return res.send(`Rotorno a: ${req.query.busca}`)
  }
})

app.get("/noticia", (req, res) => {
  // console.log(req.query) //acessa '/?busca=teste'
  // return res.send(req.params.id) //acessa via http://127.0.0.1:5000/sobre noticia
  return res.render('noticia')
})

app.get("/noticia/:id", (req, res) => {

  Noticias.findById(req.params.id)
    .then((noticia) => {
      if (!noticia) {
        console.log("Noticia não encontrada")
        return res.send("Noticia não encontrada")
      } else {
        // console.log(noticia)
        return res.render("noticia", { noticia: noticia })
      }
    })
    .catch((err) => {
      console.log("Teste")
      return res.redirect("/")
    })
  // console.log(req.query) //acessa '/?busca=teste'
})

app.get('/:slug', (req, res) => {
  return res.send(req.params.slug) //acessa via http://127.0.0.1:5000/sobre noticia
})

app.listen(port, () => {
  console.log(`Server iniciado em http://${ip}:${port}`)
})