const Cart = require('./cart');
const db = require('../util/database');
module.exports = class Product {
  constructor(id,title, imageUrl, price, description) {
    this.id    = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    if(this.id){
      return db.execute(`update products SET title = ?, imageUrl=?, price=?, description=?`,[this.title,this.imageUrl,this.price,this.description]);
    } else {
      return db.execute(`insert into  products (title, imageUrl, price, description) values (?, ?, ?, ?)`,[this.title,this.imageUrl,this.price,this.description]);
    }
    
  }
  static findById(id) {
    return db.execute(`select * from products where id= ?` , [id]);
  }

  static deleteById(id) {
    return db.execute(`Delete from products where id= ?` , [id]);
  }

  static fetchAll() {
    return db.execute('select * from products');
  }
};
