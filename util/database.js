  /*
  mongodb+srv://mharisjaved1996:drG8sdOfPtmVXcXW@cluster0.vrmyxzc.mongodb.net/?retryWrites=true&w=majority
  mongodb://127.0.0.1:27017/ecom
*/  
var { MongoClient } = require('mongodb');
let _db;
// Connect to the db
const mongoConnect = callback => {  
  MongoClient.connect('mongodb://127.0.0.1:27017/ecom').then(client => {
      console.log('Data base Connected!');
      _db = client.db();
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
  };

const getDb = () =>{
  if(_db){
    return _db;
  }
  throw "No Databse Found";
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;