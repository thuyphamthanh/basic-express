const User = require('../models/user.js');

module.exports = (router) => {
     /* GET users listing. */
     router.get('/users', (req, res) => {
          User.find({})
          .sort({userId: 1})
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
   
     router.post('/users', (req, res) => {
          User.create(req.body)
          .then((newUser) => {
               res.json({
                    status: 'create new User success',
                    data: newUser,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'create new User error',
                    messege: err,
               })
          });
     });

     router.patch('/users/:userId', (req, res) => {
          const {userId} = req.params;
          User.findOneAndUpdate({userId: userId}, req.body, {new: true})
          .exec()
          .then((user) => {
               res.json({
                    status: 'update success',
                    data: user,
               });
          })
          .catch((err) => {
               res.json({
                    status: 'update error',
                    messege: err,
               })
          });
     });

     router.delete('/users/:userId', (req, res) => {
          const {userId} = req.params;
          User.findOneAndRemove({userId: userId})
          .exec()
          .then((user) => {
               res.json({
                    status: 'delete success',
                    data: user,
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
