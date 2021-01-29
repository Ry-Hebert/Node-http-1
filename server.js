import Express from 'express'
import { serverRouter } from './serverRouter'

const server = Express()
const port = process.env.PORT || 5000

server.use(Express.static('public'))

server.use((req, res, next) => {
    res.status(404).send('<h1>Error: 404</h1><br><h2>Page not found</h2>')
})

server.use('/api', serverRouter)

server.listen(port, () => {console.log(`Server running at http://localhost:${port}`)})