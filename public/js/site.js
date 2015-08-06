/**
 * Created by bstenfors on 8/5/2015.
 */
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';

import schoolMod from 'js/schools/school.module'

angular.module('app', ['app.school', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

       $stateProvider
        .state('users', {
               url: '/users',
               templateUrl: 'views/partials/users.html'
           })
        .state('home',{
            url:'/',
            templateUrl: 'views/index.html'
        })
    });

console.log(angular.version);
