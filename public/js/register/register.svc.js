/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class RegisterSvc {
    constructor($http){
        this.$http = $http;
    }

    registerUser(userData){
        let status = this.$http.post('/users', userData).then(r => r.data);
        return status;
    }

    static factory($http){
        return new RegisterSvc($http);
    }
}

RegisterSvc.factory.$inject = ['$http'];

export {RegisterSvc}