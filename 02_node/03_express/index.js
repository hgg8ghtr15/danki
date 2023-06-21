const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const ip = '127.0.0.1';
const port = 5000;

app.engine('html', require("ejs").renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

var tarefas = ["Arrumar casa", "Fazer compras"]

app.get('/', (req, res) => {
  return res.render('index', { tarefas: tarefas });
})

app.get('/deletar/:id', (req, res) => {
  const id = req.params.id
  console.log(`deletar ${id}, ${tarefas[id]}`)
  tarefas.splice(id, 1)
  console.log(tarefas)
  return res.redirect('/');
})

app.post("/adicionarTarefa", (req, res) => {
  const tarefa = req.body.tarefa
  tarefas.push(tarefa)
  return res.redirect('/')
})


app.listen(port, () => {
  console.log(`Servidor rodando em: http://${ip}:${port}`)
});

