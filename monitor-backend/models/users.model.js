const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({

    user_Fname: {type:String , required: true},
    user_Lname: {type:String , required: true},
    user_Contact: {type:String , required: true},
    user_Email: {type:String , required: true},
    user_Password: {type:String}

},  {
    timestamps: true,
});

const User = mongoose.model('User', usersSchema);

module.exports = User;