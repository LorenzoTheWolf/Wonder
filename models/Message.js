const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:'You must provide a username'
    },
    text: {
        type: String,
        required: true
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat',
        required: 'You must supply a chat'
    }
});

module.exports = mongoose.model('Message', MessageSchema);

