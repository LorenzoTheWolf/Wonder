const express=require('express')
const router= express.Router()

const userController=require('../controllers/userController')
const questionController=require('../controllers/questionController')
const answerController=require('../controllers/answerController')
const chatController=require('../controllers/chatController')
const messageController=require('../controllers/messageController')


router.get('/register', function (req,res){
    res.render('register', {title:'Register', styleFile:'main.css'})
})

router.get('/credits', function (req,res){
    res.render('credits', {title:'Credits', styleFile:'main.css'})
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
    res.render('account', {title:'Account | Wonder', styleFile:'main.css'})
})

router.get('/', questionController.getQuestions, function(req, res){
    res.render('index', {title: 'Homepage', styleFile:'main.css'})
})

router.get('/create-question', userController.checkSession, function(req, res){
    res.render('create-question', {title: 'Create a new Question', styleFile:'question.css'})
});

router.post('/create-question', questionController.createSlug, questionController.createQuestion);

router.get('/question/:slug', answerController.getAnswerWithSlug, questionController.getQuestionsWithSlug, questionController.updateVisits, function(req, res){
    res.render('question', {title:res.locals.question.question, styleFile:'main.css'})
})

router.post('/create-answer/:question', answerController.createAnswer)

router.get('/chat', userController.checkSession, chatController.createChat, chatController.getChat, function (req,res){
    res.render('chat', {title:'Chat', styleFile:'main.css'})
});

router.post('/create-message/:chat', messageController.createMessage);

router.get('/question', userController.getQuestionAuthor)

module.exports = router;