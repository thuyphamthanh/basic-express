const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
     _id: {
          type: String,
          unique: true,
          required: true,
     },
     name: String,
     image: String,
     thumbnail: String,
     shortDescription: String,
     categoryId: {
          type: String,
          ref: 'Category',
     },
     salePrice: Number,
     originalPrice: Number,
     images: [String],
     thumbnails: [String],
});

module.exports = mongoose.model('Product', ProductSchema);