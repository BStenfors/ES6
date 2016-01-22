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
import menuItemsMod from 'js/menuItems/menuItems.module';
import channelGuideMod from 'js/channelGuides/channelGuides.module';
import login from 'js/login/login.module';
import register from 'js/register/register.module';

angular.module('app', ['app.login', 'app.register', 'app.home', 'app.school','app.toolBar',
    'app.sideNav', 'app.menuItems', 'app.channelGuides', 'ui.router', 'ngMaterial', 'ngMdIcons',
    'angularGrid'])
    .run(function($rootScope, $state, loginSvc){

        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            //Send the user to the login page if they haven't logged in yet, and it's not the login page
            let loggedIn = loginSvc.loggedIn;

            //if(typeof loggedIn != 'undefined' && !loggedIn && next.name != "login"){
            //    event.preventDefault();
            //    $state.go("login");
            //}
        });

    })
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $locationProvider){
        $urlRouterProvider.otherwise('/');

       $stateProvider
           //.state('login',{
           //    url: '/login',
           //    templateUrl: 'views/partials/login.html'
           //})
        .state('register',{
               url: '/register',
               templateUrl: 'views/partials/register.html'
           })
        .state('users', {
               url: '/users',
               templateUrl: 'views/partials/users.html'
           })
        .state('home',{
            url:'/',
            templateUrl: 'views/index.html'
        })
        .state('adminMenuItems',{
               url:'/admin-menu-items',
               templateUrl: 'views/partials/admin/menuItems.html'
           })
        .state('schools',{
               url: '/schools',
               templateUrl: 'views/partials/admin/schools.html'
           })
           .state('channelGuides',{
               url: '/channel-guides',
               templateUrl: 'views/partials/channelGuides.html'
           })
           .state('schedules',{
               url: '/schedules',
               templateUrl: 'views/partials/schedules.html'
           })

        $locationProvider.html5Mode(true);

        var customPrimary = {
            '50': '#404040',
            '100': '#333333',
            '200': '#262626',
            '300': '#1a1a1a',
            '400': '#0d0d0d',
            '500': '#000',
            '600': '#000000',
            '700': '#000000',
            '800': '#000000',
            '900': '#000000',
            'A100': '#4d4d4d',
            'A200': '#595959',
            'A400': '#666666',
            'A700': '#000000'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
            customPrimary);

        var customAccent = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#fff',
            '600': '#f2f2f2',
            '700': '#e6e6e6',
            '800': '#d9d9d9',
            '900': '#cccccc',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#bfbfbf'
        };
        $mdThemingProvider
            .definePalette('customAccent',
            customAccent);

        var customWarn = {
            '50': '#ffb280',
            '100': '#ffa266',
            '200': '#ff934d',
            '300': '#ff8333',
            '400': '#ff741a',
            '500': '#ff6400',
            '600': '#e65a00',
            '700': '#cc5000',
            '800': '#b34600',
            '900': '#993c00',
            'A100': '#ffc199',
            'A200': '#ffd1b3',
            'A400': '#ffe0cc',
            'A700': '#803200'
        };
        $mdThemingProvider
            .definePalette('customWarn',
            customWarn);

        //var customBackground = {
        //    '50': '#ffffff',
        //    '100': '#ffffff',
        //    '200': '#ffffff',
        //    '300': '#ffffff',
        //    '400': '#ffffff',
        //    '500': '#fff',
        //    '600': '#f2f2f2',
        //    '700': '#e6e6e6',
        //    '800': '#d9d9d9',
        //    '900': '#cccccc',
        //    'A100': '#ffffff',
        //    'A200': '#ffffff',
        //    'A400': '#ffffff',
        //    'A700': '#bfbfbf'
        //};
        //$mdThemingProvider
        //    .definePalette('customBackground',
        //    customBackground);

        //black background color
        var black = $mdThemingProvider.extendPalette('grey', {
            'A100': '000000'
        });
        //$mdThemingProvider.definePalette('black', black);


        $mdThemingProvider.theme('default')
            .accentPalette('customAccent',{
                'default':'50'
            })
            .primaryPalette('customPrimary',{
                'default': 'A100'
            })
            .backgroundPalette('grey', {
                'default': 'A200',
                'hue-1': '300',
                'hue-2': '600',
                'hue-3': '900'
            });

    });

console.log(angular.version);
