const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const urlRoute = require('./routes/url.js');
const staticRoute = require('./routes/staticRouter.js');
const userRoute = require('./routes/user.js');

const URL = require('./models/url.model.js');
const {restrictTpLogedinUserOnly, checkAuth} = require('./middlewares/auth.js');

const app = express();
PORT = 3000;


mongoose.connect('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('Mongo DB Connected'))
.catch((err) => console.log('Connection error:', err));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/url', restrictTpLogedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortURL : shortId
    }, {
        $push: {
            visitInfo: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => console.log('Listening on port:', PORT));