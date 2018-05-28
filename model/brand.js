const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name is required'],
    unique: true

  },
  image: { type: String, required: true }

});


const Brand = mongoose.model('brand', BrandSchema);
module.exports = Brand;