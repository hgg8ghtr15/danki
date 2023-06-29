var mongoose = require('mongoose')
var { Timestamp } = require('mongodb');
var Schema = mongoose.Schema

var postschema = new Schema({
  titulo: String,
  imagem: String,
  categoria: String,
  conteudo: String,
  autor:String,
  datapublicacao: { type: Date, default: Date.now },

}, { collection: 'noticias' })


var Noticias = mongoose.model("Noticias", postschema)

module.exports = Noticias
// dataPuplicates: Date
// _id: Object,