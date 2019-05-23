const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Chat = mongoose.model('Chat');

exports.createChat = function(req, res, next){
    Chat.find({}).then(function(chat){
        console.log(chat);
        if(chat.length == 0 ){
            const chatData=req.body;
            const chat = new Chat({
                users: [req.session.user._id],
                messages: [],
            });
            chat.save().then(function(chat){
                if(chat){
                    next();
                }
            })
        }
        next();
    })
}

exports.getChat=function(req,res,next){
    Chat.find({}).then(function(chats){
        res.locals.chat = chats[0];
        next()
    })
}