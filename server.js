require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')
const LikedShips = require('./models/likedShips')
const UserLogin = require('./models/userLogin')

const server = new Express()

server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
  })

Mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

server.listen(process.env.PORT || 3001, () =>{
    console.log('Server is running')
})

server.use('/', Express.static('./src'))

server.get('/model/likedShips', (req, res, next) => {
    LikedShips.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.get('/model/likedShipsLength', (req, res, next) => {
    LikedShips.find({}, (err, items) =>{
        let x = items.length
        if(err){console.log(handleError(err))}
        res.json(x)
    })
})

server.get('/model/userLogin', (req, res, next) => {
    UserLogin.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.get('/model/collections', (req, res, next) => {
    LikedShips.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.post('/model/likedShips', (req, res, next) => {
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
    shipName: req.query.name,
    category: req.query.category,
    storeImage: req.query.storeImage,
    storeURL: req.query.storeURL,
    brochure: req.query.brochure,
    description: req.query.description,
    numberOf: 1,
    categoryID: catLength + 1,
    })

    res.sendStatus(200)
})

server.post('/model/userLogin', (req, res, next) => {
    console.log(req.query)
    
    UserLogin.create({
        userName: req.query.userName,
        userID: req.query.userID,
    })

    res.sendStatus(200)
})

server.put('/model/likedShips/:id', (req, res, next) =>{
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

server.put('/model/userLogin/:id', (req, res, next) =>{
    UserLogin.findById(req.params.id, (err, items) =>{
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

server.delete('/model/likedShips/:id', (req, res, next) =>{
    console.log(`This is the delete route: ${req.params.id}`)
    LikedShips.remove({shipID: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        LikedShips.find({}, (err, items) =>{
            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
})