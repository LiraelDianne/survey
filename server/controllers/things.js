console.log('things controller')

var mongoose = require('mongoose')
var Thing = mongoose.model('things')

function ThingController() {
    this.index = function(req, res) {
        Thing.find({}, function(err, things) {
            if(err) {
                res.json({status: false, error: err})
            } else {
            //return a list of things
                res.json({status: true, data: things})
            }
        })
    }
    this.create = function(req, res) {
        var thing = new Thing(req.body)
        thing.save(function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, data: thing})
            }
        })
    }
    this.show = function(req, res) {
        Thing.findOne({_id: req.params.id}, function(err, thing) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true, data: thing})
            }
        })
    }
    this.update = function(req, res) {
        Thing.update({_id: req.params.id}, {}, function(err) {
            if(err) {
                res.json({status: false, error: err.errors})
            } else {
                res.json({status: true})
            }
        })
    }
    this.delete = function(req, res) {
        Thing.remove({_id: req.params.id}, function(err) {
            if(err) {
                res.json({status: false, error: err})
            } else {
                res.json({status: true})
            }
        })
    }
}
module.exports = new ThingController()
