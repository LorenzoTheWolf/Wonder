const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Message', MessageSchema);