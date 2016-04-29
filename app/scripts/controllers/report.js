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
      var f2 = this.files[0];
      $scope.dataCost = [[]];
      $scope.dataDistance = [[]];
      $scope.dataNbCenters = [[]];
      $scope.labels = [];
      Papa.parse(f2, {
        header: true,
	      complete: function(results) {
          alertSuccess();
          for (var i = 0; i < results.data.length; i++) {
            var dataline = results.data[i];
            if(dataline === undefined){
              break;
            }
            i++;
            if(i%10000 === 0){
              $scope.labels.push(i);
            }
            else{
              $scope.labels.push("");
            }
            $scope.dataCost[0].push(dataline.cout);
            $scope.dataDistance[0].push(dataline.distanceTotale);
            $scope.dataNbCenters[0].push(dataline.nbcentres);
          }
	      }
      });
    };
  });
