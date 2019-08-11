const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Category = require('../models/category.js');
const userAdmin = require('./users');
const categoryAdmin = require('./categories');
const productAdmin = require('./product');

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

userAdmin(router);
productAdmin(router);
categoryAdmin(router);

module.exports = router;