const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Category = require('../models/category.js');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/onlinestore', {useNewUrlParser: true});

const getProductsAmount = async () => {
     return Product.count();
};

const getUsersAmount = async () => {
     return User.count();
};

const getCategoriesAmount = async () => {
     return Category.count();
};

const navigation = async () => {
     return (navigationLinks = {
          admin: '/admin',
          users: '/admin/users',
          products: '/admin/products',
          categories: '/admin/categories',
        });
};
router.get('/', (req, res) => {
     Promise.all([
          getProductsAmount(),
          getUsersAmount(),
          getCategoriesAmount(),
          navigation()
     ])
     .then(([productsAmount, usersAmount, categoriesAmount, navigationLinks]) => {
          res.render('admin', {
               usersLink: navigationLinks.users,
               usersAmountTitle: 'Number of Users',
               usersAmount: usersAmount,
               productsLink: navigationLinks.products,
               productsAmountTitle: 'Number of Products',
               productsAmount: productsAmount,
               categoriesLink: navigationLinks.categories,
               categoriesAmountTitle: 'Number of Categories',
               categoriesAmount: categoriesAmount,
          });
     })
     .catch(err => console.error(err));
});

router.get('/products', (req, res) => {
     Product.find({})
     .exec((err, products) => {
          if (err) console.error(err)
          else
               res.render('products', {products})
     });
});

router.get('/products/:productId', (req, res) => {
     const {productId} = req.params;
     Product.findById(productId, (err, product) => {
          if (err) console.error(err)
          else
               res.render('productDetail', {product: product});
     })
     ;
});

router.get('/products/find/:name', (req, res) => {
     const {name} = req.params;
     db.collection('products').createIndex({name: "text"});
     Product.find({ $text: { $search: name}})
     .exec((err, products) => {
          if (err) {
               res.json({
                    messege: err
               });
          }
          else {
               res.json({
                    messege: 'success',
                    data: products
               });
          }
     });
});

router.get('/users', (req, res) => {
     User.find({})
     .exec((err, users) => {
          if (err) console.error(err)
          else
               res.render('users', {users: users});
     });
});

router.get('/users/:userId', (req, res) => {
     const {userId} = req.params;
     User.find({
          userId: userId
     })
     .exec((err, user) => {
          if (err) console.error(err)
          else
               res.render('userDetail', {user: user[0]});
     });
});

router.get('/categories', (req, res) => {
     Category.find({})
     .exec((err, categories) => {
          if (err) console.error(err)
          else
               res.render('categories', {categories: categories});
     })
});

module.exports = router;