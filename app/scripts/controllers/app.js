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
      let file = this.files[0];
      $scope.markers = {};
      $scope.markers.models = [];
      $scope.polylines = [];
      Papa.parse(file, {
        header: true,
	      complete: function(results) {
          alertSuccess();
          let i = 0;
          for (let dataline of results.data) {
            if(dataline === undefined)
              break;
            i++;
            $scope.polylines.push({
              id:i,
              path:[
                {latitude:dataline.latitude1, longitude:dataline.longitude1},
                {latitude:dataline.latitude2, longitude:dataline.longitude2}
              ],
              stroke: { color: '#000000', weight: 1+5*(dataline.nbpersonne1/10) }
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
