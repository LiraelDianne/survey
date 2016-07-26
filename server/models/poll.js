console.log('poll model')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PollSchema = new mongoose.Schema({
    question: {type: String, required: true, minlength: 8},
    option1: {type: String, required: true, minlength: 3},
    option2: {type: String, required: true, minlength: 3},
    option3: {type: String, required: true, minlength: 3},
    option4: {type: String, required: true, minlength: 3},
    _author: {type: Schema.Types.ObjectId, ref: 'users'},
    _votes: [{type: Schema.Types.ObjectId, ref: 'votes'}]
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

mongoose.model('polls', PollSchema)
