class Pessoa {
  constructor(nome, idade) {
    this.nome = nome
    this.idade = idade
  }
  falar() {
    return console.log("Bom dia")
  }
}

module.exports = Pessoa
