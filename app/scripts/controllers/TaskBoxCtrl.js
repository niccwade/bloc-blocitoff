(function(){
    function TaskBoxCtrl($firebaseObject, $scope){
//    this.testdata = [{message: "Hello there"}, {message: "Hello there"}, {message: "Hello there"}];
        this.testdata = ["Hellooo", "Hi"];
    var ref = new Firebase("https://shining-fire-4626.firebaseio.com");
  // download the data into a local object
     var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
  // putting a console.log here won't work, see below
    
    window.foo = syncObject;
        
        var currentTime;
        
        
        syncObject.$loaded(function(){
           if(syncObject.tasks == undefined){
                syncObject.tasks = [{text: "WTF"}]
                syncObject.$save()
            }
        })

        
    $scope.addTask = function(message){
            currentTime = getCurrentTime();
        seeDate(currentTime.toString());
            syncObject.tasks.push({text: message, timeCreated: currentTime.toString(), status: 'active'})
            syncObject.$save()
    }
    
    $scope.isTaskExpired = function(taskTimeCreationString){
        var isTaskExpiredValue;
        var currentDate = getCurrentTime();
        var sevenDaysAgoDate = currentDate.setDate(currentDate.getDate()-7);
        var taskTimeCreationDateFormat = new Date(taskTimeCreationString);
        if(taskTimeCreationDateFormat < sevenDaysAgoDate){
            isTaskExpiredValue = true;
        } else{
            isTaskExpiredValue = false;
        }
        return isTaskExpiredValue;
    }
    
    getCurrentTime = function(){
        return new Date();
    }
    
    seeDate = function(dateString){
        var dateTest = new Date(dateString)
        console.log(dateTest);
        console.log(dateTest.getDay());
    }
    
    }
    angular
    .module('nicoleBlocitoff')
    .controller('TaskBoxCtrl',['$firebaseObject', '$scope', TaskBoxCtrl]);
    
})();


//app.controller("SampleCtrl", function($scope, $firebaseObject) {
//  var ref = new Firebase("https://shining-fire-4626.firebaseio.com");
//  // download the data into a local object
//     var syncObject = $firebaseObject(ref);
//  // synchronize the object with a three-way data binding
//  // click on `index.html` above to see it used in the DOM!
//  syncObject.$bindTo($scope, "data");
//  // putting a console.log here won't work, see below
//    
//    window.foo = syncObject;
//});


//
//
//(function(){
//    function AlbumCtrl(Fixtures, SongPlayer) {
//        this.albumInfo = Fixtures.getAlbumInfo();
//        this.songPlayer = SongPlayer;
//    }
//    angular
//        .module('blocJams')
//        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
//})();