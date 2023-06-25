const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Console } = require('console');

const app = express();
const ip = '127.0.0.1'
const port = 5000

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'))

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.query) //acessa '/?busca=teste'
  const teste = "teste"
  if (req.query.busca == null) {
    return res.render('index', { teste: teste })

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