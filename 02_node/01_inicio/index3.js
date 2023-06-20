const readLine = require('readline')

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Qual Seu Nome ", (nome) => {
  console.log(`Seu nome é ${nome}`)
  rl.question("Qual sua idade ", (idade) => {
    console.log(`sua idade é ${idade}`)
  })
})

rl.on("close", () => {
  console.log("Fim")
  process.exit(0)
})