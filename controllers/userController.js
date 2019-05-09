const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

exports.validateRegister = function(req, res, next) {
    const userData = req.body;

    const userWithEmail = User.findOne({email:userData.email}).then(function(user){
        if (user) {
            res.render('register', { title: 'Register', styleFile:'main.css', errors: ['Email is already on use'] })
        }
    });

    const userWithUsername = User.findOne({username:userData.username}).then(function(user){
        if (user) {
            res.render('register', { title: 'Register', styleFile:'main.css', errors: ['Username is already on use'] })
        }
    });

    if(userData.password != userData.confirmPassword){
        res.render('register', {title:'Register', styleFile:'main.css', errors:["Passwords don't match"] });
    } else if(userData.password && userData.confirmPassword < 5){
        res.render('register', {title:'Register', styleFile:'main.css', errors:["Please include more than two characters in the password"] });
    }else{
        next();
    }
};

exports.registerUser = function(req, res, next) {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword
    });

    user.save().then(function(res){
        console.log(user);
        next();
    });
};

exports.signout = function(req, res){
    if (req.session.user) {
        res.clearCookie('user_sid');
        res.redirect('/');
    }
    res.redirect('/login')
};

exports.checkSession = function(req, res, next){
    if (req.session.user) {
        next();
    }else{
        res.redirect('/login');
    }
};

exports.checkLoggedOut = function(req, res, next){
    if (req.session.user) {
        res.redirect('/');
    }
    next();
};

exports.login = function(req, res) {
    const userData = req.body;

    const user = User.findOne({email: userData.email}).then(function(user){
        if (!user){
            res.render('login',{title:'login', styleFile: 'main.css', errors: ['No user found with this email'] });
        }

        const validPassword = bcrypt.compareSync(userData.password, user.password);

        if(validPassword == true){
            console.log(user);
            req.session.user = user;
            res.redirect('/');
        }
        else{
            res.render('login',{title:'login', styleFile: 'main.css', errors: ['Wrong password'] });
        }
    });
};
