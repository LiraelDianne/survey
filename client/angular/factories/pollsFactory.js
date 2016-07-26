console.log('Polls Factory');
app.factory('pollsFactory', ['$http', function($http) {
    // constructor for our factory
    var polls = [];
    var poll = {};

    function PollsFactory(){
        var _this = this;
        this.index = function(callback){
            //update/set the polls variable
            $http.get('/polls').then(function(returned_data){
                console.log(returned_data.data);
                polls = returned_data.data.data;
                if (typeof(callback) == 'function') {
                    callback(polls);
                }
            });
        };
        this.create = function(newpoll,callback){
            console.log('making poll', newpoll)
            $http.post('/polls', newpoll).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            });
        };
        this.show = function(id, callback){
            $http.get('/polls/'+id).then(function(returned_data) {
                poll = returned_data.data.poll
                if (typeof(callback) === 'function') {
                    callback(poll)
                }
            })
        };
        this.update = function(poll, vote, callback) {
            $http.put('/polls/'+poll._id, {voteId: vote._id}).then(function(returned_data){
                console.log(returned_data.data)
                if (typeof(callback) == 'function') {
                    callback(returned_data.data)
                }
          });
        };
        this.delete = function(id, callback){
            $http.delete('/polls/'+id).then(function(returned_data) {
                console.log(returned_data.data)
                if (typeof(callback) == 'function') {
                  callback(returned_data)
                }
            })
            poll = {}
        };
        // methods for setting and getting the information stored in the factory
        // no db calls
        this.getPolls = function(callback){
          callback(polls);
        };
        this.getPoll = function(callback){
          callback(poll);
        };
    }
    return new PollsFactory();
}]);
