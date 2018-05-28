const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user_id: {
 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    product_id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
});


const Wishlist = mongoose.model('wishlist', WishlistSchema);
module.exports = Wishlist;
