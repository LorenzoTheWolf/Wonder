const express=require('express')
const router= express.Router()

const userController=require('../controllers/userController')
const questionController=require('../controllers/questionController')
const answerController=require('../controllers/answerController')

router.get('/register', function (req,res){
    res.render('register', {title:'Register', styleFile:'main.css'})
})

router.post('/register',userController.validateRegister, userController.registerUser, function(req, res){
    res.redirect('/')
});

router.get('/login', userController.checkLoggedOut, function(req,res){
    res.render('login', {title: 'Login', styleFile:'main.css'})
})

router.post('/login', userController.login)

router.get('/signout', userController.signout)

router.get('/account', userController.checkSession, function(req,res){
    res.render('account', {title:'User account'})
})

router.get('/',questionController.getQuestions ,function(req, res){
    res.render('index', {title: 'Homepage', styleFile:'main.css'})
})

router.get('/create-question', userController.checkSession, function(req, res){
    res.render('create-question', {title: 'Create a new Question', styleFile:'question.css'})
});

router.post('/create-question', questionController.createSlug, questionController.createQuestion);

router.post('/create-answer/:question', answerController.createAnswer)

module.exports = router;