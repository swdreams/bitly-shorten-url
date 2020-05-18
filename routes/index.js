var express = require('express');
var router = express.Router();
const indexView = 'index';
const indexTitle = 'Please fill your long URL';

const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient('0ecbabe04e0f073979ae988dbe264c5983ce612b', {});

async function getShortUrls(url) {
    let result;
    try {
        result = await bitly.shorten(url);
    } catch (e) {
        throw e;
    }
    return result;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render(indexView, {
        title: indexTitle,
        url: 'http://google.com',
        count: 1,
        data: []
    });
});
router.post('/', async function (req, res, next) {
    let url = req.body.url;
    let count = req.body.count;
    let data = [];
    for (let i = 0; i < count; i++) {
        let x = await getShortUrls(url + '#' + i);
        data[i] = x.link;
    }
    res.render(indexView, {
        title: indexTitle,
        url: url,
        count: count,
        data: data
    });
});

module.exports = router;
