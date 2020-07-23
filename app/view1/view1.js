'use strict';

var list = angular.module('listService', ['ngRoute']);

list.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1CtrlGets'
  });
}])

list.controller('View1CtrlGets', function($scope, $http) {
  $scope.$emit("refresh", true);
  $scope.$on('refresh', function(event){
    console.log("event", event)
    console.log("resresh", $scope.$on('refresh'))
    $http({
      method: 'GET',
      url: 'http://localhost:9090/employees'
    }).then(function success(response) {
      $scope.value = response.data
      console.log($scope.value)
    })
  })
  
});

// list.controller('getEmployeeById', function($scope,$http,$routeParams){
//   $scope.user = null;
//   var id = $routeParams.id;
//   $scope.getByID = function() {
//           $http.get("http://localhost:9090/employee/" + id).then(function(response){
//               console.log("get");
//               $scope.user = response.data;
//           });
//       }
  
//      getByID();
//   });

list.controller('getEmployeeById', function ($scope, $http) {
  $scope.id = null;
  $scope.getById = function (id) {
    
  console.log(id)
  //Call the service to delete data
  $http.get('http://localhost:9090/employee/'+id).then(function (response) {
    // if (response.data)
    console.log(response)
    $scope.msg = "Data Deleted Successfully!";
  }, function (response) {
    $scope.msg = "Service not Exists";
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();
  });
  };
  });


list.controller('deleteServiceCtrl', function ($scope, $http) {
  $scope.id = null;
  $scope.deletedata = function (id) {
  console.log(id)
  var said = confirm('Are you sure want to delete ?');
 
  if(said==false) {
    console.log('you out');
  } else {
    $http.delete('http://localhost:9090/employee/'+id ).then(function (response) {
    console.log(response)
    $scope.msg = "Data Deleted Successfully!";
    $scope.$emit("refresh", true);
  }, function (response) {
    $scope.msg = "Service not Exists";
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();
  });
  }
  };
});