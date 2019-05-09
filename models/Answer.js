const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answer:{
        type: String,
        required: 'You must provide an answer'
    },
    created:{
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply a username'
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: 'You must supply a question'
    }
});

function autopopulate(next) {
    this.populate('author');
    next();
}

AnswerSchema.pre('find', autopopulate);
AnswerSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Answer', AnswerSchema);