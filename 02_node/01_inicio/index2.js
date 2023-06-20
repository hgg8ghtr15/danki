const http = require('http')
const fs = require('fs')

const hostname = "127.0.0.1"
const port = 3000

//criar novo arquivo
// fs.writeFile("teste.txt", "Testando o js", (error) => {
//   if (error) throw error
//   console.log("Arquivo criado com sucesso!")
// })

//cria arquivo
fs.appendFile("teste.txt", "\noutro/conteudo", (error) => {
  if (error) throw error
  console.log("Arquivo criado com sucesso!")
})

//ler arquivo
fs.readFile("teste.txt", (erro, data) => {
  let str = data.toString()
  let newSrt = str.slice("/")
  console.log(newSrt)
})

// delatar
// fs.unlink('teste.txt', (error) => {
//   console.log("Arquivo Deletado")
// })

fs.rename("teste.txt", "dankconde.doc", (error) => {
  console.log("Arquivo renomeado com sucesso!")
})

const server = http.createServer((req, res) => {

  if (req.url == "/dank") {
    fs.readFile('index.html', function (error, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    })
  } else {
    return res.end()
  }

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

