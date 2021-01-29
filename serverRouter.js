import { Router } from 'express'

const apiRouter = Router()

const apiData = {
    title: 'API Data',
    info: 'This is filler data',
    name: 'Ryan'
}

apiRouter.get('/api', (req, res, next) => {
    res.send(JSON.stringify(apiData))
})

export const apiRouter