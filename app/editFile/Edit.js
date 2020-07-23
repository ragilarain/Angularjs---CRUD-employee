'use strict';

var passingData = angular.module('Edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Edit/:theParam', {
    templateUrl: 'editFile/Edit.html',
    controller: 'View2Ctrl'
  });
}])

passingData.controller('getEmployeeById', function($scope, $http, $routeParams) {
  $scope.$emit('profile', {

  })
 });

// .controller('View2Ctrl', [function() {

// }]);
passingData.controller('getPositions', function($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://localhost:9090/positions'
  }).then(function success(response) {
    $scope.position = response.data
    console.log($scope.value)
  })
});

// var passingData = angular.module('postServiceApp',[]);
passingData.controller('putEmployee', function($scope, $http) {

  console.log($scope.$emit('Profile'))
  
  $scope.putData = function (name,birthDate,positionIdTransient,idNumber,gender) {
    
    // $scope.$emit('Profil', {
      
    // })
    // $scope.name =name;
    // $scope.birthDate = birthDate;
    // $scope.positionIdTransient = positionIdTransient;
    // $scope.idNumber = idNumber;
    // $scope.gender = gender;    
    var data = {
      name: $scope.name,
      birthDate: birthDate,
      positionIdTransient: positionIdTransient,
      idNumber: idNumber,
      gender: gender,
      isDelete: 0
    };
    console.log(data)
    $http.put('http://localhost:9090/employee', JSON.stringify(data)).then(function (respon) {
      if(respon.data)
      console.log(respon.data)
      $scope.msg ="Post Data Submitted Successfully!"
    }, function (respon) {
      $scope.msg = "Service not Exists";
      $scope.statusval = respon.status;
      $scope.statustext = respon.statusText;
      $scope.headers = respon.headers();
    }
    )
  }
})

