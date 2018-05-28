var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var timestamps = require('mongoose-timestamp');


var ProductSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name is required']
  },
category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    },
  mrp:{
      type: Number ,
    required:[true,'mrp is required']
  },
  selling_price:{
      type: Number ,
    required:[true,'Name is required']
  },
  tax:{
      type: Number ,
    required:[true,'Name is required']
  },
  available_units:{
    type:Number,
      required: [true,'available units is required']
    },
    quantity: {
        type: String,
        required: [true, 'quantity is required']
    },
  description:{
        type: String
    },
    average_rating:
    {
      type: Number,
      default:0
    },
    review_count:{
type:Number,
default:0
    },
  short_description:{
        type:String
     
  },
  image: { type: String, required: true }

});

ProductSchema.plugin(timestamps);
const Product = mongoose.model('product',ProductSchema);
module.exports = Product;
