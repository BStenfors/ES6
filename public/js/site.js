/**
 * Created by bstenfors on 8/5/2015.
 */
import 'js/jspm_packages/github/angular/bower-material@0.10.0/angular-material.css';

import angular from 'angular';

import schoolMod from 'js/schools/school.module'

angular.module('app', ['app.school'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

       $stateProvider
        .state('users', {
               url: 'users',
               templateUrl: 'views/partials/users.html'
           });
    });

console.log(angular.version);