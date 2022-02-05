const Mongoose =  require('mongoose')
const blogSchema = new Mongoose.Schema({
    content:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true,
    }
})

module.exports = Mongoose.model('blog',blogSchema);
