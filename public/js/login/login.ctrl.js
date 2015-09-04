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
            if(status.message === "User Created!"){
                self.user.name = '';
                self.user.email = '';
            }
        });
    }

    createAccount(){
        this.$state.go('register');
    }
}

LoginCtrl.$inject = ['loginSvc', 'sideNavSvc', '$mdSidenav', '$state'];

export { LoginCtrl }