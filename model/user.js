const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name is required']
  },
  phone:{
  type:String
},
email:{
  type: String,
  required:[true,'Email is required'],
  unique: true
},
password:{
  type: String
 
}
});


const User = mongoose.model('user',UserSchema);
module.exports = User;
