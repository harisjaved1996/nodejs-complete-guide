  /*
  mongodb+srv://mharisjaved1996:drG8sdOfPtmVXcXW@cluster0.vrmyxzc.mongodb.net/?retryWrites=true&w=majority
  mongodb://127.0.0.1:27017/ecom
*/  
var { MongoClient } = require('mongodb');

// Connect to the db
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb://127.0.0.1:27017/ecom'
  ).then(client => {
      console.log('Data base Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;