var myModule = angular.module("TestApp", []);
myModule.controller("MyController", function($scope){
    $scope.alertMe = function(){
        alert("Hello Everyone");
    };
});
