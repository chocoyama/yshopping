const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/items', async (req, res) => {
    const endpoint = "https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch";
    const appid = "";
    const queryString = `appid=${appid}&query=${req.query.keyword}`;
    const url = `${endpoint}?${queryString}`;
    axios.get(encodeURI(url))
        .then(result => {
            res.json(result.data)
        }).catch(err => {
            res.json(err)
        })
});

module.exports = router;