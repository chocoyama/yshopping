const {parse} = require('url');
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
    dev,
    dir: './src/app'
});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    app.use(cors({origin: true}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/api/items', async (req, res) => {
        const endpoint = "https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch";
        const queryString = qs.stringify({
            appid: "",
            ...req.query
        });
        const url = `${endpoint}?${queryString}`;
        axios.get(url)
            .then(result => {
                res.json(result.data)
            }).catch(err => {
            res.json(err)
        })
    });
    app.get('*', (req,res) => {
        const parsedUrl = parse(req.url, true);
        const {pathname, query} = parsedUrl;
        return handle(req, res, parsedUrl)
    });
    app.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000')
    })
});