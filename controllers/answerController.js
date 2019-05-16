const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');
const Question = mongoose.model('Question');

exports.createAnswer = function(req, res){
    const answerData = req.body;
    const answer = new Answer({
        answer: answerData.answer,
        author: req.session.user._id,
        question: req.params.question
    });

    answer.save().then(function(store){

        if(store){
            res.redirect('back');
        }
    });
};

exports.getAnswerWithSlug = function(req, res, next){
    const slug = req.params.slug;
    Question.findOne({slug: slug}).then(function(question){
        if (question) {
            Answer.find({question: question._id} ).then(function(answers){
                if (answers) {
                    res.locals.answers = answers;
                    next();
                };
            });
        };
    });
};