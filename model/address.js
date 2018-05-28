var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var timestamps = require('mongoose-timestamp');


var AddressSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name is required']
  },
user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    phone: {
        type: String,
    required:[true,'phone number is required']
  },
    flat_no: {
        type: String,
    required:[true,'Flat no is required']
  },
    street: {
        type: String,
    required:[true,'Street name is required']
    },
    area: {
        type: String
    },
    landmark: {
        type: String
    },
    city: {
        type: String,
        required: [true, 'city name is required']
    },
    state: {
        type: String,
        required: [true, 'state  is required']
    },
    pincode: {
        type: Number,
        required: [true, 'Pincode is required']
    },
    type: {
        type: String,
        required: [true, 'type is required']
    },
 
  description:{
        type: String
    }
});

AddressSchema.plugin(timestamps);
const Address = mongoose.model('address', AddressSchema);
module.exports = Address;
