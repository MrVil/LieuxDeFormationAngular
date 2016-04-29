'use strict';

/**
 * @ngdoc function
 * @name lieuxDeFormationAngularApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the lieuxDeFormationAngularApp
 */
angular.module('lieuxDeFormationAngularApp')
  .controller('AppCtrl', function ($scope, $log, $alert, $http, uiGmapGoogleMapApi) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*========= F I C H I E R S ==========*/
    var alertSuccess =  function(){
      $alert({
        title: 'C\'est tout bon !',
        content: 'Le fichier CSV est chargé.',
        container: '.alerts-container', type: 'success', show: true
      });
    };

    $scope.markers = {};
    $scope.markers.models = [];
    $scope.polylines = [];

    document.querySelector('#file-solution-map').onchange = function() {
      var f1 = this.files[0];
      $scope.markers = {};
      $scope.markers.models = [];
      $scope.polylines = [];
      Papa.parse(f1, {
        header: true,
	      complete: function(results) {
          alertSuccess();

          for (var i = 0; i < results.data.length; i++/*var dataline of results.data*/) {
            var dataline = results.data[i];
            if(dataline === undefined || dataline.longitude1 === "" || dataline.latitude1 === "" || dataline.longitude1 === undefined){
              dataline = {longitude1:"0", latitude1:"0",nbpersonne:"0",longitude2:"0", latitude2:"0"};
            }
            $log.log(dataline);
            /*$scope.markers.models.push({
              id:i,
              latitude:dataline.latitude1,
              longitude:dataline.longitude1,
            });*/
            $scope.polylines.push({
              id:i,
              path:[
                {latitude:dataline.latitude1, longitude:dataline.longitude1},
                {latitude:dataline.latitude2, longitude:dataline.longitude2}
              ],
              stroke: { color: '#c03200', weight: 1+5*(dataline.nbpersonne1/10) }
            });
          }
	      }
      });
    };

    /*========= G O O G L E _ M A P ==========*/
    uiGmapGoogleMapApi.then(function() {
      $scope.map = { center: { latitude: 47, longitude: 2.5 }, zoom: 6 };
      $scope.map.options = {
        disableDefaultUI: false
      };
    });

  });
