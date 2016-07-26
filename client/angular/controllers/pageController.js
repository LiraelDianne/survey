app.controller('pageController', ['$scope', '$routeParams', '$location', 'thingsFactory', 'usersFactory', function($scope, $routeParams, $location, thingsFactory, usersFactory) {
    //$routeParams is for getting info from the #/ routes
    //$location is for redirecting to a new #/ when finished

    var index = function() {
        thingsFactory.index(function(returnedData) {
            $scope.things = returnedData
        })
    }
    index();
    $scope.create = function() {
        // create a new thing
        thingsFactory.create($scope.newThing, function(returnedData) {
            $scope.thing = returnedData.data
            // wipe the temporary object once added
            $scope.newThing = {}
            //$location.url('/show/'+$scope.thing._id)
        })
    }
    var show = function() {
        thingsFactory.show($routeParams.id, function(data) {
            $scope.thing = data.data
        })
    }
    $scope.update = function() {
        thingsFactory.update($scope.thing)
        // $location.url('/show/'+$scope.thing._id)
    }
    // delete by id
    $scope.delete = function(id) {
        thingsFactory.delete(id)
        index()
    }
}])
