const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
     {
          categoryId: {
               type: String,
               unique: true,
               required: true,
          },
          name: String,
          description: String,
     }
);

module.exports = mongoose.model('Category', CategorySchema);