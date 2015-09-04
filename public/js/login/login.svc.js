/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class LoginSvc {
    constructor($http){
        this.$http = $http;
    }

    login(userData){
        let status = this.$http.post('/users', userData).then(r => r.data);
        return status;
    }

    static factory($http){
        return new LoginSvc($http);
    }
}

LoginSvc.factory.$inject = ['$http'];

export {LoginSvc}