console.log('restful routes')
var users = require('../controllers/users')
var polls = require('../controllers/polls')
var votes = require('../controllers/votes')
module.exports = function(app){
    //votes
    app.get('/votes', votes.index);
    app.get('/votes/options/:pollid/:option', votes.showPollOptions);
    app.get('/votes/:userid', votes.show);
    app.post('/votes', votes.create);
    app.put('/votes/:id', votes.update);

    //polls
    app.get('/polls', polls.index);
    app.get('/polls/:id', polls.show);
    app.post('/polls', polls.create);
    app.put('/polls/:id', polls.update);
    app.delete('/polls/:id', polls.delete);

    //users
    app.post('/users', users.create);
    app.get('/users/login/:name', users.login);
    app.get('/users/session', users.getSessionUser);
    app.get('/users/logout', users.logout)
    app.get('/users/:id', users.show);
    app.put('/users/:id', users.update);
    app.delete('/users/:id', users.delete);
}
