console.log('Votes Factory');
app.factory('votesFactory', ['$http', function($http) {
    // constructor for our factory
    var votes = [];
    var vote = {};

    function VotesFactory(){
        var _this = this;
        this.index = function(callback){
            //update/set the votes variable
            $http.get('/votes').then(function(returned_data){
                console.log(returned_data.data);
                votes = returned_data.data;
                if (typeof(callback) == 'function') {
                    callback(votes);
                }
            });
        };
        this.create = function(newvote,callback){
            $http.post('/votes', newvote).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    callback(returned_data);
                }
            });
        };
        this.showOptions = function(poll, option, callback) {
            $http.get('/votes/options/'+poll._id+'/'+option).then(function(returned_data) {
                var votes = returned_data.data.votes
                if (typeof(callback) === 'function') {
                    callback(votes)
                }
            })
        }
        this.show = function(user, callback){
            $http.get('/votes/'+user._id).then(function(returned_data) {
                var vote = returned_data.data.vote
                if (typeof(callback) === 'function') {
                    callback(vote)
                }
            })
        };
        this.update = function(vote, callback){
            $http.put('/votes/'+vote._id, vote).then(function(returned_data){
                console.log(returned_data.data)
                if (typeof(callback) == 'function') {
                    callback(returned_data.data)
                }
          });
        };
        this.delete = function(id, callback){
            $http.delete('/votes/'+id).then(function(returned_data) {
                console.log(returned_data.data)
                if (typeof(callback) == 'function') {
                  callback(returned_data)
                }
            })
            vote = {}
        };
        // methods for setting and getting the information stored in the factory
        // no db calls
        this.getVotes = function(callback){
          callback(votes);
        };
        this.getVote = function(callback){
          callback(vote);
        };
    }
    return new VotesFactory();
}]);
