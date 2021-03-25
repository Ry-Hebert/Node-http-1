const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const userLoginSchema = new Schema({
    userName: String,
    userID: Number,
})

module.exports = Mongoose.model('userlogin', userLoginSchema)
