'use strict';

/**
 * @ngdoc function
 * @name lieuxDeFormationAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lieuxDeFormationAngularApp
 */
angular.module('lieuxDeFormationAngularApp')
  .controller('MainCtrl', function ($http, $scope, $log) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    //var reader = new FileReader();
    //reader.readAsText(file, 'UTF-8');

    $scope.hello = 'Ohay pirates !';
    $scope.isdone = 'En attente du serveur ...';

    $http.get('http://localhost:5000/api/agency').then(
      function(res){
        $scope.dataset = res.data;
        $log.log(res.data[0].Name);
        $scope.isdone = 'Le serveur à répondu !';
      }, function(res){
        $scope.isdone = 'Le serveur n\'a pas répondu, veuillez recharger la page !';
        $log.error(res.statusText);
        $log.error('Cannot access the server');
      }
    );
  });
