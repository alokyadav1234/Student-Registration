const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    paymentStatus:{type:String}
})

module.exports = mongoose.model('Student', studentSchema)
