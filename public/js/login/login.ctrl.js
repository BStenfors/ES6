/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class LoginCtrl {
    constructor (loginSvc, $state){
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
            if(status.status === 200){
                this.loginSvc.loggedIn = true;
                this.$state.go('home');
            }else{
                this.$state.go('login');
            }
        });
    }

    createAccount(){
        this.$state.go('register');
    }
}

LoginCtrl.$inject = ['loginSvc', '$state'];

export { LoginCtrl }