const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: { type: String, trim: true, unique: true, required: true},
    password: { type:String, required: true, trim: true},
},{ timestamps: true})

module.exports = mongoose.model('User', UserSchema)