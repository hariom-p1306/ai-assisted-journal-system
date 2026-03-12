const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema({
 userId:{
  type:String,
  required:true
 },
 ambience:{
  type:String
 },
 text:{
  type:String,
  required:true
 },
 emotion:{
  type:String
 },
 keywords:[String],
 summary:String,
 createdAt:{
  type:Date,
  default:Date.now
 }
})

module.exports = mongoose.model("Journal", journalSchema)