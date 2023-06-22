const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const ip = '127.0.0.1'
const port = 5000

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('veiw', path.join(__dirname, 'veiws'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.query)


  res.send("Home")
})

app.get('/:slug', (req, res) => {
  res.send(req.params.slug)
})

app.listen(port, () => {
  console.log(`Server iniciado em http://${ip}:${port}`)
})