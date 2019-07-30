const express = require('express');
const router = express.Router();
const products = require('../data/products.json');
const users = require('../data/users.json');
const categories = require('../data/categories.json');

router.get('/', (req, res) => {
     res.render('admin', {
          usersLink: '/admin/users',
          usersAmountTitle: 'Number of Users',
          usersAmount: users.body.length,
          productsLink: '/admin/products',
          productsAmountTitle: 'Number of Products',
          productsAmount: products.body.length,
          categoriesLink: '/admin/categories',
          categoriesAmountTitle: 'Number of Categories',
          categoriesAmount: categories.body.length
     })
});

router.get('/products', (req, res) => {
     res.render('products', {products : products.body});
});

router.get('/products/:productId', (req, res) => {
     const {productId} = req.params;
     const product = products.body.find(data => data._id == productId);
     res.render('productDetail', {product: product});
});

router.get('/users', (req, res) => {
     res.render('users', {users: users.body});
});

router.get('/users/:userId', (req, res) => {
     const {userId} = req.params;
     const user = users.body.find(data => data._id === userId);
     res.render('userDetail', {user: user});
});

router.get('/categories', (req, res) => {
     res.render('categories', {categories: categories.body});
});

module.exports = router;