// variables et constantes
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const sheetRouter = require('./routes/sheet');
const sheetsRouter = require('./routes/sheets');
const createsheetRouter = require('./routes/createSheet');
const deleteSheetRouter = require('./routes/deleteSheet');
const addMemberRouter = require('./routes/addMember');
const fileRouter = require('./routes/fileOperation');
var userId = 1;
var sheetId = -1;


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
app.set('view engine', 'ejs');//html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//docs static, ex: .css, .js, .png, etc

//Ajouter les routes ici
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/error', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/files',fileRouter);
app.use('/sheets', sheetsRouter);
app.use('/sheet', sheetRouter);
app.use('/createsheet', createsheetRouter);
app.use('/deleteSheet', deleteSheetRouter);
app.use('/addMember', addMemberRouter);


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
  res.render('error', { title: 'Error Page', message: err.message, error: err });
});

// exporter les variables globales pour les autres fichiers
module.exports = app;
global.userId = userId;
global.sheetId = sheetId;
