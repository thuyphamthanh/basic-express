const Category = require('../models/category.js');

module.exports = (router) => {
     router.get('/categories', (req, res) => {
          Category.find({})
          .exec((err, categories) => {
               if (err) console.error(err)
               else
                    res.render('categories', {categories: categories});
          })
     });

     router.get('/categories/:categoryId', (req, res) => {
          const {categoryId} = req.params;
          Category.find({
               categoryId: categoryId
          })
          .exec()
          .then((category) => {
               res.json({
                    status: 'get a Category success',
                    data: category,
               })
                    //res.render('categoryDetail', {category: category[0]});
          })
          .catch((err) => {
               res.json({
                    status: 'error',
                    messege: err,
               })
          });
     });

     router.post('/categories', (req, res) => {
          Category.create(req.body)
          .then((newCategory) => {
               res.json({
                    status: 'create new Category success',
                    data: newCategory,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'create new Category error',
                    messege: err,
               })
          });
     });

     router.patch('/categories/:categoryId', (req, res) => {
          const {categoryId} = req.params;
          Category.findOneAndUpdate({categoryId: categoryId}, req.body, {new: true})
          .exec()
          .then((category) => {
               res.json({
                    status: 'update success',
                    data: category,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'update error',
                    messege: err,
               })
          });
     });

     router.delete('/categories/:categoryId', (req, res) => {
          const {categoryId} = req.params;
          Category.findOneAndRemove({categoryId: categoryId})
          .exec()
          .then((category) => {
               res.json({
                    status: 'delete success',
                    data: category,
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