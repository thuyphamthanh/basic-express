const mongoose = require('mongoose');

let products = require('../data/products.json');
let users = require('../data/users.json');
let categories = require('../data/categories.json');

const Product = require('../models/product.js');
const User = require('../models/user.js');
const Category = require('../models/category.js');

mongoose.connect('mongodb://localhost:27017/onlinestore', {useNewUrlParser: true})
.then(() => {
     return Promise.all([
			Category.deleteMany({}, (err) =>{
                    if (err) {console.log(err)}
                    else {console.log('Delete Categories successfull')}
               }),
			User.deleteMany({}, (err) =>{
                    if (err) {console.log(err)}
                    else {console.log('Delete Users successfull')}
               }),
               Product.deleteMany({}, (err) =>{
                    if (err) {console.log(err)}
                    else {console.log('Delete Products successfull')}
               }),
		])})
.then(() => {
     categories = categories.body;
     users = users.body;
     return Promise.all([
          Category.insertMany(categories),
          User.insertMany(users),
     ]);
})
.then(() => {
     products = products.body.map((product) => {
          product._id = product._id
               ? mongoose.mongo.ObjectId(product._id)
               : new mongoose.mongo.ObjectId();
          return {
               ...product,
          }
     });

     return Product.insertMany(products);
})
.then(() => process.exit(0))
.catch(err => {
     console.error(err);
     process.exit(1);
});