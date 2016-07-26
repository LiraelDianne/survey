app.controller('pollController', ['$scope', '$routeParams', '$location', 'pollsFactory', 'votesFactory', 'usersFactory',
    function($scope, $routeParams, $location, pollsFactory, votesFactory, usersFactory) {

    //login check
    usersFactory.success(function(user) {
        if(user) {
            $scope.user = user
        } else {
            $location.url('/')
        }
    })
    // get poll and options
    var index = function() {
        pollsFactory.show($routeParams.id, function(poll) {
            $scope.poll = poll
            votesFactory.showOptions(poll, 1, function(votes) {
                $scope.option1votes = votes
            })
            votesFactory.showOptions(poll, 2, function(votes) {
                $scope.option2votes = votes
            })
            votesFactory.showOptions(poll, 3, function(votes) {
                $scope.option3votes = votes
            })
            votesFactory.showOptions(poll, 4, function(votes) {
                $scope.option4votes = votes
            })
        })
    }
    index()
    $scope.vote = function(option) {
        // check if vote exists
        votesFactory.show($scope.user, function(returnedData) {
            if (returnedData) {
                // if it does, update it
                vote = returnedData
                vote.option = option
                votesFactory.update(vote, function(returnedData) {
                    index()
                })
            // if it doesn't, make a new one
            } else {
                votesFactory.create({vote: option, _voter: $scope.user._id, _poll: $scope.poll._id}, function(returnedData) {
                    vote = returnedData
                    // add a vote to the user
                    usersFactory.update($scope.user, {$addToSet: {_votes: vote._id}}, function(returnedData) {
                        index()
                    })
                })
            }
        })
    }
}])
