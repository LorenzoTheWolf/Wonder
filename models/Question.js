mongoose =require('mongoose')
const Schema= mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type:String,
        trim:true,
        required:'You must type a question',
    },
    /*answer:{
        type:String,
        trim: true,
    },*/
    slug:{
        type:String, 
        unique:true,
    },
})

module.exports=mongoose.model('Question', questionSchema);