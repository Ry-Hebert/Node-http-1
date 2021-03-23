const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const likedShipsSchema = new Schema({
    shipLists: Number,
    complete: Boolean,
    category: String,
    categoryID: Number,
    id: Number
})

module.exports = Mongoose.model('todoItems', likedShipsSchema)
