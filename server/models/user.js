console.log('user model')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 250},
    _polls: [{type: Schema.Types.ObjectId, ref: 'polls'}],
    _votes: [{type: Schema.Types.ObjectId, ref: 'votes'}],
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

mongoose.model('users', UserSchema)
