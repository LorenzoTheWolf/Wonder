const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Message = mongoose.model('Message');

exports.createMessage =function(res,req){
    const messageData=req.body;
    if(!messageData.message){
        res.render('createMessage', {title: 'createMessage', errors: ['Missing message ❌❗']})
    }
    const message= new Question({
        message:messageData.message,
        sender: req.session.user._id,
    })
    message.save().then(function(message){
        if (message){
            res.redirect('back')
        }
    })
}