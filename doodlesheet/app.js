// variables et constantes
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
const fileRouter = require('./routes/fileOperation');


const express = require('express');
const app = express();

// connection a la database DoodleSheet
const { default: mongoose } = require('mongoose');
const url = "mongodb://127.0.0.1/DoodleSheet"
async function connect(){
  try{
    await mongoose.connect(url);
    console.log("Connected to de database DoodleSheet");
  }catch(error){
    console.log(error);
  }
}
connect();

// ecoute sur le port 8000
app.listen(8000, () => {
  console.log("Server started on port 8000")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');//html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//docs static, ex: .css, .js, .png, etc

//Ajouter les routes ici
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/error', usersRouter);
//app.use('/register', registerRouter);
//app.use('/registerdone', registerRouter);
app.use('/login', loginRouter);
app.use('/authentification', loginRouter);
app.use('/files',fileRouter);

//****fonction middlewares**** ajouter ici
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// exporter les variables globales pour les autres fichiers
module.exports = app;
