require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')
const LikedShips = require('./models/likedShips')

const server = new Express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

Mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

server.listen(process.env.PORT || 3001, () =>{
    console.log('Server is running')
})

server.use('/', Express.static('./src'))

server.get('/model/likedShips', (req, res) => {
    LikedShips.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.get('/model/likedShipsLength', (req, res) => {
    LikedShips.find({}, (err, items) =>{
        let x = items.length
        if(err){console.log(handleError(err))}
        res.json(x)
    })
})

server.get('/model/user', (req, res) => {
    LikedShips.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.get('/model/collections', (req, res) => {
    LikedShips.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.post('/model/likedShips', (req, res) => {
    console.log(req.query)
    
    let qData = []

    LikedShips.find({}, (err, data) =>{
        if(err){console.log(err)}
        else{
            console.log(data)
            qData.push(data)
        }
    })

    console.log(`Find Test: ${qData}`)

    let catSize = qData.filter(item =>{
        return item.category === req.query.category
    })
    
    let catLength = catSize.length

    LikedShips.create({
    shipID: req.query.shipID,
    manufacturer: req.query.manufacturer,
    category: req.query.category,
    storeImage: req.query.storeImage,
    storeURL: req.query.storeURL,
    brochure: req.query.brochure,
    description: req.query.description,
    numberOf: 1,
    categoryID: catLength + 1
    })

    res.sendStatus(200)
})

server.put('/model/likedShips/:id', (req, res) =>{
    LikedShips.findById(req.params.id, (err, items) =>{
        if(err){console.log(handleError(err))}
        items.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            LikedShips.find({}, (err, itemsX) =>{
                if(err){console.log(handleError(err))}
                res.json(itemsX)
            })
        })
    })
})

server.delete('/model/likedShips/:id', (req, res) =>{
    console.log(`This is the delete route: ${req.params.id}`)
    LikedShips.remove({id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        LikedShips.find({}, (err, items) =>{
            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
})