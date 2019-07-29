const express = require('express');
const router = express.Router();
const fs = require('fs');
let products = [], users = [];
try {
     products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
     //console.log(products);
     } catch (err) {
     console.error(err);
}

try {
     users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
     } catch (err) {
     console.error(err);
}

router.get('/products', (req, res) => {
     res.render('products', {products : products.body});
});

router.get('/products/:productId', (req, res) => {
     const {productId} = req.params;
     const product = products.body.find(data => data._id == productId); //filter(data => data._id === productID);
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

module.exports = router;