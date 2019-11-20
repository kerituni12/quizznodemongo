var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var Test = require('./controllers/test');
var Question = require('./controllers/question');
var Result = require('./controllers/result');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/static", express.static('static'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index');
})
app.get('/test', Test.showtest );
app.get('/createtest', function(req, res) {
  res.render('createtest');
});
app.post('/createtest', Test.createtest);
app.post('/result', Result.createresult);
app.get('/question', function (req, res) {
  res.render('question');
});
app.get('/loadquestion/:test_id', Question.loadquestion);
app.get('/edit/:test_id', Question.editquestion);
app.get('/delete/:test_id', Test.deltest);
app.post('/question/:test_id', Question.createquestion);
app.post('/updatequestion/:test_id', Question.post_editquestion);
app.get('/result/:test_id', Result.showresult);
app.get('/listtest', Test.loadtest);
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server started on port ' + port);
});