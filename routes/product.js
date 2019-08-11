const mongoose = require('mongoose');
const db = mongoose.connection;
const Product = require('../models/product.js');

module.exports = (router) => {
     router.get('/products', (req, res) => {
          Product.find({})
          .exec((err, products) => {
               if (err) console.error(err)
               else
                    res.render('products', {products})
          });
     });
     
     router.get('/products/:id', (req, res) => {
          const {id} = req.params;
          Product.findById(id, (err, product) => {
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
                    //res.render('products', {products});
               }
          });
     });

     router.get('/products/filter', (req, res) => {
          //products?filter={"where":{"salePrice":520},"offset":2,"limit":2}
          const {query} = req.query;
          console.log(query);
          Product.find({
               salePrice: 699
          })
          .limit(10)
          .sort({name: 1})
          .exec()
          .then((products) => {
               res.json({
                    messege: 'success',
                    data: products
               });
               //res.render('products', {products});
          })
          .catch((err) => {
               res.json({
                    messege: err
               });
          })
     });

     router.post('/products', (req, res) => {
          Product.create(req.body)
          .then((newProduct) => {
               res.json({
                    status: 'create new Product success',
                    data: newProduct,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'create new Product error',
                    messege: err,
               })
          });
     });

     router.patch('/products/:id', (req, res) => {
          const {id} = req.params;
          Product.findByIdAndUpdate(id, req.body, {new: true})
          .exec()
          .then((product) => {
               res.json({
                    status: 'update success',
                    data: product,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'update error',
                    messege: err,
               })
          });
     });

     router.delete('/products/:id', (req, res) => {
          const {id} = req.params;
          Product.findByIdAndRemove(id)
          .exec()
          .then((product) => {
               res.json({
                    status: 'delete success',
                    data: product,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'delete error',
                    messege: err,
               })
          });
     });
};