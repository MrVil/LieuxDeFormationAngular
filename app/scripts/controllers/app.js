'use strict';

/**
 * @ngdoc function
 * @name lieuxDeFormationAngularApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the lieuxDeFormationAngularApp
 */
angular.module('lieuxDeFormationAngularApp')
  .controller('AppCtrl', function ($scope, $log, $alert, uiGmapGoogleMapApi) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*========= C H A R T ==========*/
    $scope.labels = ['Agence A', 'Agence B', 'Agence C', 'Agence D', 'Agence E', 'Agence F', 'Agence G'];
    $scope.series = ['1ère série', '2ème série'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];


    /*========= F I C H I E R S ==========*/
    var alertSuccess =  function(){
      $alert({
        title: 'C\'est tout bon !',
        content: 'Le fichier CSV est chargé.',
        container: '#alerts-container', type: 'success', show: true
      });
    };

    $scope.markers = {};
    $scope.markers.models = [];

    document.querySelector('#file-agency').onchange = function() {
      let file = this.files[0];
      Papa.parse(file, {
        header: true,
	      complete: function(results) {
		      console.log("Finished:", results.data);

          alertSuccess();
          for (let dataline of results.data) {
            $scope.markers.models.push({
              id:dataline.codepostal,
              latitude:dataline.latitude,
              longitude:dataline.longitude
            });
          }
	      }
      });
    };

    /*========= G O O G L E _ M A P ==========*/
    uiGmapGoogleMapApi.then(function() {
      $scope.map = { center: { latitude: 47, longitude: 2.5 }, zoom: 6 };
      $scope.map.options = {
        disableDefaultUI: true
      };
    });

  });
