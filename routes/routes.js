const express=require('express')
const router= express.Router()

const userController=require('../controllers/userController')

router.get('/register', function (req,res){
    res.render('register', {title:'Register', styleFile:'register.css'})
})

router.post('/register',userController.validateRegister, userController.registerUser, function(req, res){
    res.redirect('/')
});

router.get('/login', userController.checkLoggedOut, function(req,res){
    res.render('login', {title: 'Login', styleFile:'register.css'})
})

router.post('/login', userController.login)

router.get('/signout', userController.signout)

router.get('/account', userController.checkSession, function(req,res){
    res.render('account', {title:'User account'})
})

router.get('/', function(req, res){
    res.render('index', {title: 'Homepage', styleFile:'index.css', places:req.places})
})
module.exports = router;