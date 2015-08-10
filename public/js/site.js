/**
 * Created by bstenfors on 8/5/2015.
 */
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-animate';
import 'angular-grid';
import 'angular-material-icons';

//Global Modules
import toolBarMod from 'js/toolbar/toolBar.module';
import sideNaveMod from 'js/sideNav/sideNav.module';

//View specific modules
import homeMod from 'js/home/home.module';
import schoolMod from 'js/schools/school.module';

angular.module('app', ['app.home', 'app.school','app.toolBar','app.sideNav', 'ui.router', 'ngMaterial', 'ngMdIcons', 'angularGrid'])
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider){
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

        //Custom Theming with Angular-Material
        var customBlueMap = $mdThemingProvider.extendPalette('orange', {
            'contrastDefaultColor': 'dark',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '800',
                'hue-1': '500'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
    });

console.log(angular.version);
