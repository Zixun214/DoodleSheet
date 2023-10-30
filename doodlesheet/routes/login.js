var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// modele usercollections
const usercollectionSchema = new mongoose.Schema({
  name: String,
  password: String
})
const Usercollection = mongoose.model('usercollections', usercollectionSchema)

/* GET Login Page*/
router.get("/", async(req, res) => {
  const result = await Usercollection.find();
  //res.send({"login" : result})
  console.log(result);
  res.render('login', { "userlist" : result});
})

module.exports = router;