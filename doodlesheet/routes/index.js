var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const usercollectionSchema = new mongoose.Schema({
  name: String,
  password: String
})

const User = mongoose.model('usercollections', usercollectionSchema)



router.get("/login", async(req, res) => {
  const result = await User.find();
  //res.send({"login" : result})
  console.log(result);
  res.render('login', {
    "userlist" : result
});
})

module.exports = router;
