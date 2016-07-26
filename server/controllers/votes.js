console.log('votes controller')

var mongoose = require('mongoose')
var Vote = mongoose.model('votes')

function VoteController() {
    this.index = function(req, res) {
        Vote.find({}, function(err, votes) {
            if(err) {
                res.json({status: false, error: err})
            } else {
            //return a list of votes
                res.json({status: true, data: votes})
            }
        })
    }
    this.create = function(req, res) {
        var vote = new Vote(req.body)
        vote.save(function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, data: vote})
            }
        })
    }
    this.showPollOptions = function(req, res) {
        Vote.find({_poll: req.params.pollid, vote: req.params.option}, function(err, votes) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, votes: votes})
            }
        })
    }
    this.show = function(req, res) {
        Vote.findOne({_user: req.params.userid}, function(err, vote) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, vote: vote})
            }
        })
    }
    this.update = function(req, res) {
        Vote.update({_id: req.params.id}, {}, function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true})
            }
        })
    }
}
module.exports = new VoteController()
