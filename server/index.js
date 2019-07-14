const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api', require('./routes/index'))
    app.get('*', (req,res) => {
        const parsedUrl = parse(req.url, true)
        const {pathname, query} = parsedUrl
        return handle(req, res, parsedUrl)
    })
    app.listen(3000, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})