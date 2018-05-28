const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var timestamps = require('mongoose-timestamp');

const ReviewSchema = new Schema({
    message:{
        type: String,
        default:""
    },
    rating:{

        type : Number,
        default:5
    },
    user_id: {
 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
    },
    product_id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required:true
        }
});

ReviewSchema.plugin(timestamps);
const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;
