var MongoClient = require('mongodb').MongoClient;

// class Database {
//      constructor() {
//         let _this = this;
//         return new Promise(function(resolve, reject) {
//             MongoClient.connect('mongodb://localhost', function (err, client) {
//                 if (err) throw err;
//                 _this.db = client.db('mydb');
//                 //console.log('database connected');
//                 resolve(_this.db);
//             });             
//         }) 
//     }
// }


//module.exports = Database;

// MongoClient.connect('mongodb://localhost', function (err, client) {
//   if (err) throw err;
//     var db = client.db('mydb');
//     console.log(db);

//     // let quizz = new Quizz();

//     // quizz.text = 'may o dau';
//     // quizz.answers  = ['1','2','3'];
//     // quizz.correct_answer = 'nguyen van hieu';
//     // quizz.tags = 'nam';

//     // db.collection('Quizz').insertOne(quizz);

//     // console.log(quizz);
// }); 
