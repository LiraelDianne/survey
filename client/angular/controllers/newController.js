app.controller('newController', ['$scope', '$location', 'pollsFactory', 'usersFactory', function($scope, $location, pollsFactory, usersFactory) {

    //login check
    usersFactory.success(function(user) {
        if(user) {
            $scope.user = user
        } else {
            $location.url('/')
        }
    })
    $scope.error = {}

    $scope.create = function() {
        // create a new poll
        $scope.newPoll._author = $scope.user._id
        pollsFactory.create($scope.newPoll, function(returnedData) {
            console.log(returnedData)
            if(returnedData.error) {
                console.log(returnedData.error)
                $scope.error = returnedData.error
            } else {
                var poll = returnedData.poll
                $scope.poll = returnedData.poll
                // add poll to user
                usersFactory.update($scope.user, {$addToSet: {_polls: poll._id}}, function(returnedData) {
                    // wipe the temporary object once added
                    $scope.newPoll = {}
                    $location.url('/dashboard')
                })
            }
        })
    }
    $scope.cancel = function() {
        $scope.newPoll = {}
        $location.url('/dashboard')
    }
}])
