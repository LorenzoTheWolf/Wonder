const mongoose= require('mongoose')
const Question= mongoose.model('Question')
const slug = require('slugs')

exports.createSlug= function(req,res, next){
    console.log(req.body.question);
    let slugName= slug(req.body.question)
    const slugRegEx= new RegExp(`^(${slugName})((-[0-9]*$)?)$`, 'i')
    Question.find({slug:slugRegEx}).then(function(questions){
        if(questions.length>0){
            slugName=slugName+'-'+questions.length;
        }
        req.body.slug= slugName;
        next();
    })
}

exports.createQuestion = function(req,res){
    const questionData = req.body;
    if(!questionData.question){
        res.render('createQuestion', {title: 'createQuestion', errors: ['Missing question ❌❗']})
    }
    const question= new Question({
        question:questionData.question,
        slug:questionData.slug,
        author: req.session.user._id,
    })
        
    question.save().then(function(question){
        if (question){
            res.redirect('/')
        }
    })
}

exports.updateVisits = function(req,res,next){
    const slug = req.params.slug;
    Question.findOne({slug:slug}).then(function(question){
        Question.updateOne({slug: question.slug},{visits: question.visits + 1}).then(function(question){
            if(question){
                next();
            }
        })
    })
}

exports.getQuestionsWithSlug=function(req,res,next){
    const slug= req.params.slug;
    Question.findOne({slug: slug}).then(function(question){
        if(!question){
            res.render('Error 404, file not found')
        }
        res.locals.question=question
        next()
    })
}

exports.getQuestions=function(req,res, next){
    console.log('Getting question')
    Question.find({}).then(function(questions){
        console.log(questions);
        res.locals.questions = questions;
        next()
    })
}

