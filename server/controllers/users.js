console.log('users controller')

var mongoose = require('mongoose')
var User = mongoose.model('users')

function UserController() {
    this.create = function(req, res) {
        var user = new User(req.body)
        user.save(function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                req.session.user = user
                res.json({status: true, user: user})
            }
        })
    }
    this.show = function(req, res) {
        var name = req.params.name
        User.findOne({name: name}, function(err, user) {
            if(err) {
                res.json({error: err})
            } else {
                res.json({user: user})
            }
        })
    }
    this.login = function(req, res) {
        User.findOne({name: req.params.name}, function(err, user) {
            if(err) {
                res.json({status: false, error: err})
            } else if (user) {
                req.session.user = user
                res.json({status: true, user: user, session: req.session})
            } else {
                res.json({status: false, error: "No user found"})
            }
        })
    }
    this.getSessionUser = function(req, res) {
        res.json({status: true, user: req.session['user']})
    }
    this.logout = function(req, res) {
        req.session.destroy()
        res.json({status: true})
    }
    this.update = function(req, res) {
        User.update({_id: req.params.id}, req.body, function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true})
            }
        })
    }
    this.delete = function(req, res) {
        User.remove({name: req.params.name}, function(err) {
            if(err) {
                res.json({status: false, error: err})
            } else {
                res.json({status: true})
            }
        })
    }
}
module.exports = new UserController()
