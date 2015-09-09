/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class LoginCtrl {
    constructor (loginSvc, sideNavSvc, $mdSidenav, $state){
        this.$state = $state;
        this.loginSvc = loginSvc;
        this.user = {};
        this.init();
    }

    init(){
    }

    login(loginData){
        var self = this;
        this.loginSvc.login(loginData.user).then(status =>{
            if(status.loggedIn){
                this.loginSvc.userLoggedIn = true;
                this.$state.go('/');
            }else{
                this.$state.go('login');
            }
        });
    }

    createAccount(){
        this.$state.go('register');
    }
}

LoginCtrl.$inject = ['loginSvc', 'sideNavSvc', '$mdSidenav', '$state'];

export { LoginCtrl }