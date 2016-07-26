console.log('polls controller')

var mongoose = require('mongoose')
var Poll = mongoose.model('polls')

function PollController() {
    this.index = function(req, res) {
        Poll.find({})
        .populate('_author')
        .exec(function(err, polls) {
            if(err) {
                res.json({status: false, error: err})
            } else {
            //return a list of polls
                res.json({status: true, data: polls})
            }
        })
    }
    this.create = function(req, res) {
        var poll = new Poll(req.body)
        poll.save(function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, poll: poll})
            }
        })
    }
    this.show = function(req, res) {
        Poll.findOne({_id: req.params.id}, function(err, poll) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, poll: poll})
            }
        })
    }
    this.update = function(req, res) {
        Poll.update({_id: req.params.id}, {$addToSet: {_votes: req.body.voteId}}, function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true})
            }
        })
    }
    this.delete = function(req, res) {
        Poll.remove({_id: req.params.id}, function(err) {
            if(err) {
                res.json({status: false, error: err})
            } else {
                res.json({status: true})
            }
        })
    }
}
module.exports = new PollController()
