(function(){
    function TaskBoxCtrl($firebaseObject, $scope){
        $scope.query = {}
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
    
    
    $scope.tasksFilter = function(task){
        var returnValue = false
        
        if($scope.query.completed){
            if(task.status == "complete"){
                returnValue = true
            }
        }       
         if($scope.query.notCompleted){
            if(task.status == "notComplete"){
                returnValue = true
            }
        }   
        if($scope.query.active){
            if($scope.isTaskExpired(task.timeCreated) == false){
                returnValue = true
            }
        }   
         if($scope.query.expired){
            if($scope.isTaskExpired(task.timeCreated) == true){
                returnValue = true
            }
        }   
    
        return returnValue
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