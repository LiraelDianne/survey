console.log('vote model')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var VoteSchema = new mongoose.Schema({
    vote: {type: Number, min: 1, max: 4},
    _voter: {type: Schema.Types.ObjectId, ref: 'users'},
    _poll: {type: Schema.Types.ObjectId, ref: 'polls'}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

mongoose.model('votes', VoteSchema)
