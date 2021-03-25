const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const likedShipsSchema = new Schema({
    shipID: Number,
    manufacturer: String,
    shipName: String,
    category: String,
    storeImage: String,
    storeURL: String,
    brochure: String,
    description: String,
    numberOf: String,
    categoryID: Number,
})

module.exports = Mongoose.model('likedShips', likedShipsSchema)
