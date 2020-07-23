'use strict';

var passingData = angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

passingData.controller('View2Ctrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: 'http://localhost:9090/positions'
  }).then(function success(response) {
    $scope.value = response.data
    console.log($scope.value)
  })

  $scope.name = null;
  $scope.birthDate = null;
  $scope.positionIdTransient = null;
  $scope.idNumber = null;
  $scope.gender = null;
  $scope.isDelete = null;
  $scope.postData = function (name,birthDate,positionIdTransient,idNumber,gender) {
    var said = confirm('Are you sure want to submit this ?');
    if (said==true) {
    var data = {
      name: name,
      birthDate: birthDate,
      positionIdTransient: positionIdTransient,
      idNumber: idNumber,
      gender: gender,
      isDelete: 0
    };
    console.log(data)
    $http.post('http://localhost:9090/employee', JSON.stringify(data)).then(function (respon) {
      if(respon.data)
      $scope.msg ="Post Data Submitted Successfully!"
    }, function (respon) {
      $scope.msg = "Service not Exists";
      $scope.statusval = respon.status;
      $scope.statustext = respon.statusText;
      $scope.headers = respon.headers();    
    }
    )
    alert("Data has been submit !")
    console.log($scope.postData ={});
    
  } else {
    console.log('you out');
  }

  }
})

