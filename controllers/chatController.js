const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Chat = mongoose.model('Chat');

exports.createChat = function (req, res, next) {
    Chat.find({}).then(function (chats) {
        if (chats.length == 0) {
            const chatData = req.body;
            const chat = new Chat({
                users: [req.session.user._id],
                messages: [],
            });
            chat.save().then(function (chat) {
                if (chat) {
                    next();
                }
            })
        }
        else if (chats.length > 0) {
            Chat.findOneAndUpdate({ _id: chats[0]._id, 'users': { $ne: req.session.user._id } }, { $push: { users: req.session.user._id } }).then(function (chat) {
                console.log(chat);
                next(); 
            });
        }
    })
}

exports.getChat = function (req, res, next) {
    Chat.find({}).then(function (chats) {
        res.locals.chat = chats[0];
        console.log(chats[0]);
        next()
    })
}