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
    }],
})

function autopopulate(next) {
    //this.populate('senders');
    this.populate('messages');
    next();
}

ChatSchema.pre('find', autopopulate);
ChatSchema.pre('findOne', autopopulate);


module.exports = mongoose.model('Chat', ChatSchema);