const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  // write a tag file
  filePath = __dirname + '/public/tag.txt';
  var date = new Date();
  var datetime = date.getMonth() + 1 + "/" +  date.getDate() + "," + date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds();
  var text = datetime + " " + req.body.filename + "/" + req.body.tag1 + "/" + req.body.tag2 + "/" + req.body.tag3 + '\r\n';
  //var text = req.body.filename + " " + req.body.tag1 + " " + req.body.tag2 + " " + req.body.tag3 + '\r\n';
  fs.appendFile(filePath, text, function(err) {
      if (err) return console.log(err);
      console.log('successfully appended "' + text + '"');
      //res.end();
  });

  // make the photo file
  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });



})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;
