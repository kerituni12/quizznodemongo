var ObjectId = require('mongodb').ObjectID;
let {client , connection} = require('../DB');
var Question = require('../models/Question');

function createquestion (req, res) {  
  // console.log  (req.body);
connection.then(() => {
    let db = client.db('mydb');
    let test_id = req.params.test_id;
    var reqArray = []
    if (req.body.question instanceof Array) {
  
      req.body.question.forEach((q, i) => {
        var question = new Question();
        question.text = q
        question.answers = [req.body.one[i], req.body.two[i], req.body.three[i], req.body.four[i]]
        question.correct_answer = req.body.correct ? req.body.correct[i] : null
        question.test_id = new ObjectId(test_id)
        reqArray.push(question)
      })
  
    } else {
  
      var question = new Question();
      question.text = req.body.question
      question.answers = [req.body.one, req.body.two, req.body.three, req.body.four]
      question.correct_answer = req.body.correct ? req.body.correct[0] : null
      question.test_id = new ObjectId(test_id)
      reqArray.push(question)  
    }
  
    db.collection('Question').insertMany(reqArray, function (err, questions) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating questions',
          error: err
        });
      }
      console.log('da them');
      res.redirect('/');
    });
  
  })
}


function loadquestion(req, res) {
  // console.log(req.params.test_id);
  let id = req.params.test_id;
  let test_id = new ObjectId(id);
  console.log('id', id);
  connection.then(() => {
  let db = client.db('mydb');
  db.collection('Question').find({test_id: test_id}).toArray((err, doc) => { res.send(doc)});
  })
}

function editquestion(req, res) {
  let db = client.db('mydb');
  let test_id = req.params.test_id;
  // console.log(test_id);
  db.collection('Question').find({test_id: ObjectId(test_id)}).toArray(function(err, q){
    if(err) return console.log(err);
    res.render('edit', {question: q})
  })
}

function post_editquestion (req, res) {
  let test_id = req.params.test_id;
  connection.then(() => {
    let db = client.db('mydb');
    
    if (req.body.question instanceof Array) {
  
      req.body.question.forEach((q, i) => {
        var question = new Question();
        question.text = q
        question.answers = [req.body.one[i], req.body.two[i], req.body.three[i], req.body.four[i]]
        question.correct_answer = req.body.correct ? req.body.correct[i] : null
        question.test_id = new ObjectId(test_id)

        var id = new ObjectId(req.body.id[i])
      
        db.collection('Question').updateOne({ _id: id },{ $set: question })
      })
  
    } else {
  
      var question = new Question();
      question.text = req.body.question
      question.answers = [req.body.one, req.body.two, req.body.three, req.body.four]
      question.correct_answer = req.body.correct ? req.body.correct[0] : null
      question.test_id = new ObjectId(test_id)
     
      var id = new ObjectId(req.body.id);
      
      db.collection('Question').updateOne({ _id: id },{ $set: question })
    }
    // res.send('ok');
    res.redirect('/edit/'+ test_id);
  });
  
  // })
}
module.exports = {
  createquestion: createquestion,
  loadquestion: loadquestion,
  editquestion: editquestion,
  post_editquestion: post_editquestion
}