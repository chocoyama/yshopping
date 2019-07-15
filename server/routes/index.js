const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');

router.get('/items', async (req, res) => {
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

module.exports = router;