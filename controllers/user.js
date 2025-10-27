const {v4: uuidv4} = require('uuid');
const User = require('../models/user.model.js');
const { setUser } = require('../service/auth.js');

async function handleUserSignUp(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name: name,
        email: email,
        password: password,
    });
    res.redirect('/');
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email: email, password: password});

    if(!user){
        return res.render('signup', {
            error: 'Invalid Username or password',
        })
    }

    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect('/');
}

module.exports = {
    handleUserLogin,
    handleUserSignUp
}