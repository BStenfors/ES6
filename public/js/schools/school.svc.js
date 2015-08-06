/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SchoolSvc {
    constructor($http){
        this.$http = $http;
    }

    static factory($http){
        return new SchoolSvc($http);
    }
}

SchoolSvc.factory.$inject = ['$http'];

export {SchoolSvc}