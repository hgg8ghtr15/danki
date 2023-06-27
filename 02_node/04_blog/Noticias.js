var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postschema = new Schema({
  titulo: String,
  imagem: String,
  categoria: String,
  conteudo: String,
}, { collection: 'noticias' })

var Noticias = mongoose.model("Noticias", postschema)

module.exports = Noticias
// dataPuplicates: Date
// _id: Object,