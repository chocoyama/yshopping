const path = require('path');
const functions = require('firebase-functions');
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
    dev,
    conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
});
const handle = nextApp.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
    console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
    return nextApp.prepare().then(() => handle(req, res))
});

const app = express();
app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/items', async (req, res) => {
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
exports.api = functions.https.onRequest(app);