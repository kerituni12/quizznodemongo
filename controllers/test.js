var ObjectId = require('mongodb').ObjectID;
let {client , connection} = require('../DB');
var Test = require('../models/Test');

function showtest(req, res) {
    connection.then(() => {
      let db = client.db('mydb');

        db.collection('Test').find().toArray(function (err, t) {
          if (err) return console.log(err);
          
          res.render('test', {
            test: t           
          });
        });
      })
}

function createtest(req, res) {    
    let test = new Test();
    test.name =  req.body.name;
    connection.then(() => {
        client.db('mydb').collection('Test').insertOne(test, function(err, t) {
          res.render('question', {test : t.ops[0]})
        });
    })
    
}

function loadtest(req, res) {
  connection.then(async() => {
    var db = client.db('mydb');
    let c = [] 
    await db.collection('Test').find().forEach(async(t)=>{     
      let tmp = await db.collection('Question').find({test_id: t._id}).count();
      c.push(tmp);
      // console.log(c);
    });

    await db.collection('Test').find().toArray(function(err, tests){     
       res.render('listtest', {tests: tests, count: c})
    })
  })
}

function deltest(req, res) {
  connection.then(() => {
    var db = client.db('mydb');
    db.collection('Question').deleteMany({test_id: ObjectId(req.params.test_id)});
    db.collection('Test').deleteOne({_id: ObjectId(req.params.test_id)});

    res.redirect('/listtest');
  })
}
module.exports = {
    showtest: showtest,
    createtest: createtest,
    loadtest: loadtest,
    deltest: deltest
}