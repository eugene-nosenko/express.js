const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname + "/public"))),

  app.use(bodyParser.urlencoded({
    extended: false
  })),


  app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', require('./routes/index'));



// 404 error
app.use(function (req, res, next) {
  var err = new Error('Not found 404');
  err.status = 404;
  next(err)
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.render('pages/error', {
    message: err.message,
    error: err
  })
})

app.use(function (req, res, next) {
  console.log('Наше промежуточное ПО');
  next();
});

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port)
})