const URL = require('../models/url.model.js');
const shortid = require('shortid');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: 'URL is required'});
    }
    const shortID = shortid();
    await URL.create({
        shortURL: shortID,
        redirectUrl: body.url,
        visitInfo: [],
        createdBy: req.user._id
    });

    return res.render('home', {id: shortID});
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortURL: shortId});
    return res.json({
        totalClicks: result.visitInfo.length,
        analytics: result.visitInfo});
}

module.exports = {handleGenerateNewShortUrl, handleGetAnalytics};