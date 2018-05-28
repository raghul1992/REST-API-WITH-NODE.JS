const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name:String,
    image_url: String,
    description: String,
    brand_id: {
 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand"
    },
    product_id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
});


const Image = mongoose.model('image', ImageSchema);
module.exports = Image;
