/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class LoginSvc {
    constructor($http){
        this.$http = $http;
        this.loggedIn = false;
    }

    //properties
    get userLoggedIn() { return this.loggedIn;}
    set userLoggedIn(val) {this.loggedIn = val;}
    //properties

    login(userData){
        let status = this.$http.post('/login', userData).then(r => r.data);
        return status;
    }

    isLoggedIn(){
        return this.userLoggedIn;
    }

    static factory($http){
        return new LoginSvc($http);
    }
}

LoginSvc.factory.$inject = ['$http'];

export {LoginSvc}