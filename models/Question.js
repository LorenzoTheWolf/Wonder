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
    visits:{
        type:Number,
        default:3,
    },

    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply a username'
    },
})
function autopopulate(next) {
    this.populate('author');
    next();
}

questionSchema.pre('find', autopopulate);
questionSchema.pre('findOne', autopopulate);

module.exports=mongoose.model('Question', questionSchema);