const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users:[{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    messages:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Message'        
    }]
})

function autopopulate(next) {
    this.populate('users');
    next();
}

ChatSchema.pre('find', autopopulate);
ChatSchema.pre('findOne', autopopulate);


module.exports = mongoose.model('Chat', ChatSchema);