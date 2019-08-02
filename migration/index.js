const mongoose = require('mongoose');
//const products = require('../data/products.json');
//let users = require('../data/users.json');
let categories = require('../data/categories.json');
//const User = require('../models/user.js');
const Category = require('../models/category.js');

mongoose.connect('mongodb://localhost:27017/onlinestore', {useNewUrlParser: true})
.then(() => {
     return Promise.all([
			Category.deleteMany({}, (err, res) =>{
                    if (err) {console.log(err)}
                    else {console.log('Delete successfull')}
               }),
			//User.remove(),
		])})
.then(() => {
     console.log('Database connection successful');
     categories = categories.body;
     console.log(categories);
     return Promise.all([
          Category.insertMany(categories),
          //User.insertMany(users)
     ]);
})
.then(() => process.exit(0))
.catch(err => {
     console.error('Database connection error', err);
     process.exit(1);
});