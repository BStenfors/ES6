/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class HomeSvc {
    constructor($http){
        this.$http = $http;
    }

    addUser(userData){
        let status = this.$http.post('/users', userData).then(r => r.data);
        return status;
    }

    getUsers(){
        let users = this.$http.get('/usersList').then(r => r.data);
        return users;
    }

    removeUser(selectedUsers){
        let status = this.$http.put('/userDelete', selectedUsers[0].data).then(r => r.data);
        return status;
    }

    static factory($http){
        return new HomeSvc($http);
    }
}

HomeSvc.factory.$inject = ['$http'];

export {HomeSvc}