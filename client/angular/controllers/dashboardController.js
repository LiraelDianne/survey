app.controller('dashboardController', ['$scope', '$location', 'pollsFactory', 'usersFactory', 'votesFactory', function($scope, $location, pollsFactory, usersFactory, votesFactory) {

    //login check
    usersFactory.success(function(user) {
        if(user) {
            console.log(user._id)
            $scope.user = user
        } else {
            $location.url('/')
        }
    })

    var index = function() {
        pollsFactory.index(function(returnedData) {
            $scope.polls = returnedData
        })
    }
    index();
    // delete poll
    $scope.delete = function(id) {
        pollsFactory.delete(id, function(returnedData) {
            // remove from user
            usersFactory.update($scope.user, {$pull: {_polls: id}}, function(returnedData) {
                // refresh poll list
                index()
            })
        })
    }
}])
