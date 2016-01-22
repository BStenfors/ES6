/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class LoginSvc {
    constructor($http, $state){
        this.$http = $http;
        this.$state = $state;
        this.loggedIn = false;
    }

    //properties
    get userLoggedIn() { return this.loggedIn;}
    set userLoggedIn(val) {this.loggedIn = val;}
    //properties

    login(userData){
        let self = this;
        let status = this.$http.post('/login', userData);
        status.then(function(data){
            self.userLoggedIn = data.data.loggedIn;
            $state.go('home');
        });
        return status;
    }

    userNotLoggedIn(){
        this.$http.get('/login').then(r => r.data);
    }

    isLoggedIn(){
        return this.userLoggedIn;
    }

    static factory($http){
        return new LoginSvc($http);
    }
}

LoginSvc.factory.$inject = ['$http', '$state'];

export {LoginSvc}