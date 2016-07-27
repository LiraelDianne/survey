app.controller('loginController', ['$scope', '$location', 'usersFactory', function($scope, $location, usersFactory) {

    $scope.login = function() {
        //try to log in with this name
        usersFactory.login($scope.newUser, function(returnedData) {
            if(returnedData.data.user) {
                console.log('login has returned', returnedData.data.user)
                $scope.newUser = {}
                $location.url('/dashboard')
            } else {
                //if login fails, make a new user
                console.log('making new user')
                usersFactory.create($scope.newUser, function(returnedData) {
                    $scope.user = returnedData.data
                    // wipe the temporary object once added
                    $scope.newUser = {}
                    $location.url('/dashboard')
                })
            }
        })
    }
    // delete by id
    $scope.delete = function(id) {
        usersFactory.delete(id)
        index()
    }
}])
