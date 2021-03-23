const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const likedShipsSchema = new Schema({
    shipID: String,
    complete: Boolean,
    category: String,
    categoryID: Number,
    id: Number
})

module.exports = Mongoose.model('todoItems', likedShipsSchema)
