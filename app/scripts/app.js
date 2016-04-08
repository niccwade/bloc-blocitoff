var app = angular.module("nicoleBlocitoff", ["firebase"]);




app.controller("SampleCtrl", function($scope, $firebaseObject) {
  var ref = new Firebase("https://shining-fire-4626.firebaseio.com");
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
  // putting a console.log here won't work, see below
    
    window.foo = $scope.data
});