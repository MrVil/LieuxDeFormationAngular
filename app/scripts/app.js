'use strict';

/**
 * @ngdoc overview
 * @name lieuxDeFormationAngularApp
 * @description
 * # lieuxDeFormationAngularApp
 *
 * Main module of the application.
 */
angular
  .module('lieuxDeFormationAngularApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js',
    'uiGmapgoogle-maps',
    'mgcrea.ngStrap'
  ])
  //API Google Maps
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      china: true,
      key: 'AIzaSyCz_o7QRxQS-vBu1yfXK3dyYgS8qJU8JD8',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'drawing,geometry'
    });
  })

  //Routing
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/app', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl',
        controllerAs: 'app'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl',
        controllerAs: 'report'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'contacts'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
