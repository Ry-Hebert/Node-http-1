# Node-http: Server
 
This is a basic API server that provides functionality for an associated application.

This API uses Mongoose to model the data being passed to it. This can be found in `models/likedShips.js`.

This API also connects to a cloud hosted MongoDB Database.

##   *   At least 3 endpoints to GET data from your server

*   ```javascript
    server.get('/model/likedShips', (req, res) => {
        LikedShips.find({}, (err, items) =>{

            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
    ```

    This is called to retrieve the list of liked ships from the database when the user goes to the Favorites page.

*   ```javascript
    server.get('/model/likedShipsLength', (req, res) => {
        LikedShips.find({}, (err, items) =>{

            if(err){console.log(handleError(err))}
            res.json(items.length)
        })
    })  
    ```

    Used to recall how many ships have been liked when displaying the count on Favorites.

*   ```javascript
    server.get('/model/user', (req, res) => {
        LikedShips.find({}, (err, items) =>{

            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
    ```

    Used to check if the User is already logged in.

##  *    At least 1 endpoint allowing user to update an item via PUT or PATCH HTTP verbs

*   ```javascript
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
    ```

    This allows users to update the quantity of the liked ship in their fleet.

##  *   At least 1 endpoint allowing user to create an item via POST

*   ```Javascript
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
    ```
    This endpoint allows users to create a new liked ship.

##  *   At least 1 endpoint allowing user to delete an item via DELETE

*   ```javascript
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
    ```

    This endpoint allows users to delete a favorited item from the list.

