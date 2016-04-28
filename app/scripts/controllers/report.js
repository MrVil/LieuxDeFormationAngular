'use strict';

/**
 * @ngdoc function
 * @name lieuxDeFormationAngularApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the lieuxDeFormationAngularApp
 */
angular.module('lieuxDeFormationAngularApp')
  .controller('ReportCtrl', function ($scope, $alert) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var alertSuccess =  function(){
      $alert({
        title: 'C\'est tout bon !',
        content: 'Le fichier CSV est chargé.',
        container: '.alerts-container', type: 'success', show: true
      });
    };

    document.querySelector('#file-solution-chart').onchange = function() {
      let file = this.files[0];
      $scope.dataCost = [[]];
      $scope.dataDistance = [[]];
      $scope.dataNbCenters = [[]];
      Papa.parse(file, {
        header: true,
	      complete: function(results) {
          alertSuccess();
          for (let dataline of results.data) {
            if(dataline === undefined)
              break;
            $scope.dataCost[0].push(dataline.cout);
            $scope.dataDistance[0].push(dataline.distanceTotale);
            $scope.dataNbCenters[0].push(dataline.nbcentres);
          }
	      }
      });
    };
  });
