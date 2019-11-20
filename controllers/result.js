var ObjectId = require('mongodb').ObjectID;
let {client , connection} = require('../DB');
var Result = require('../models/Result');
function create (req, res) {
    const results = Object.keys(req.body).map((i) => req.body[i]);
    console.log(results);
    let test_id = new ObjectId(results[2]);

    connection.then(() => {
    let db = client.db('mydb');
    db.collection('Question').find({'test_id': test_id}, async function (err, docs) {
      let i = 3;
      let score = 0;
      if (err) {
        console.log(err);
        return;
      }
      await docs.forEach(function (doc) {
        if (doc.correct_answer == results[i]) {
          ++score;
        }
        
        i++;
      });

      result = new Result();
      result._id = new ObjectId()
      result.name = results[0];
      result.class = results[1];
      result.test_id = test_id
      result.score = score;

      db.collection('Results').insertOne(result);
      res.redirect('result/'+ result._id);
    });
  })
}

function showresult(req, res) {
  
  var id = new ObjectId(req.params.test_id);
  
  connection.then(() => {
    let db = client.db('mydb');

    db.collection('Results').findOne({'_id': id}, function(err, r) {
      db.collection('Test').findOne({_id: r.test_id}, function(err, t){
        res.render('result', {result: r, test: t})
      })
    });
    
  })
}
module.exports = {    
    createresult: create,
    showresult: showresult
}