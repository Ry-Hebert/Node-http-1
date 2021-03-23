const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const likedShipsSchema = new Schema({
    shipID: Number,
    manufacturer: String,
    shipName: String,
    category: String,
    categoryID: Number,
})

module.exports = Mongoose.model('todoItems', likedShipsSchema)
