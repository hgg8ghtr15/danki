const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const mongoose = require('mongoose');

const Noticias = require('./Noticias.js')

const app = express();
const ip = '127.0.0.1'
const port = process.env.PORT || 5000;

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

let nomeImagem = ""

// middle
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/');
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = originalName.split('.').pop();
    const uniqueSuffix = Date.now();
    const newName = uniqueSuffix + '.' + extension;
    nomeImagem = newName
    cb(null, newName);
  }
})
const upload = multer({ storage: storage });

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

app.get("/cadastro-Noticia", (req, res) => {
  console.log("cadastro-Noticia")
  return res.render("cadastroNoticia")
})

app.post("/cadastro-Noticia", upload.single('imagem'), (req, res) => {
  console.log(`passou por aqui`)
  console.log(`${nomeImagem}`)
  req.body['imagem'] = `public/image/${nomeImagem}`
  req.body['datapublicacao'] = new Date(req.body.data)
  const noticia = new Noticias(req.body)
  try {
    console.log(noticia)
    noticia.save()
  } catch (error) {
    console.log(error)
  }
  return res.render("cadastroNoticia")
})

app.get('/:slug', (req, res) => {
  return res.send(req.params.slug) //acessa via http://127.0.0.1:5000/sobre noticia
})

app.listen(port, () => {
  console.log(`Server iniciado em http://${ip}:${port}`)
})