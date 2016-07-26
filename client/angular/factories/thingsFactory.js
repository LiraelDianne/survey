console.log('Things Factory');
app.factory('thingsFactory', ['$http', function($http) {
    // constructor for our factory
    var things = [];
    var thing = {};

    function ThingsFactory(){
        var _this = this;
        this.index = function(callback){
            //update/set the things variable
            $http.get('/things').then(function(returned_data){
                console.log(returned_data.data);
                things = returned_data.data;
                if (typeof(callback) == 'function') {
                    callback(things);
                }
            });
        };
        this.create = function(newthing,callback){
            $http.post('/things', newthing).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    callback(returned_data);
                }
            });
        };
        this.show = function(id, callback){
            $http.get('/thing/'+id).then(function(returned_data) {
                thing = returned_data.data
                if (typeof(callback) === 'function') {
                    callback(returned_data)
                }
            })
        };
        this.update = function(thing, callback){
            $http.put('/things/'+thing._id, thing).then(function(returned_data){
                console.log(returned_data.data)
                if (typeof(callback) == 'function') {
                    callback(returned_data.data)
                }
          });
        };
        this.delete = function(id, callback){
            $http.delete('/things/'+id).then(function(returned_data) {
                console.log(returned_data.data)
                if (typeof(callback) == 'function') {
                  callback(returned_data)
                }
            })
            thing = {}
        };
        // methods for setting and getting the information stored in the factory
        // no db calls
        this.getThings = function(callback){
          callback(things);
        };
        this.getThing = function(callback){
          callback(thing);
        };
    }
    return new ThingsFactory();
}]);
