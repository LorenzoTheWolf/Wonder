const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Message = mongoose.model('Message');

exports.createMessage = function(req,res){
    const messageData=req.body;
    const chat = req.params.chat;
    console.log(messageData);
    if(!messageData.text){
        res.render('chat', {title: 'createMessage', errors: ['Missing message ❌❗']})
    }
    const message= new Message({
        text:messageData.text,
        chat: chat,
        sender: req.session.user._id,
    })
    message.save().then(function(chat){
        if (chat){
            res.redirect('back');
            console.log(message.text)   
        }
    })
}         

