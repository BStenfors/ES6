/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SchoolSvc {
    constructor($http){
        this.$http = $http;
    }

    getSchools(){
        let schools = [
            {
                name: 'K-State',
                link: '/kstate'
            },
            {
                name: 'Oklahoma State',
                link: '/oklahomastate'
            }
        ];

        return schools;
    }

    static factory($http){
        return new SchoolSvc($http);
    }
}

SchoolSvc.factory.$inject = ['$http'];

export {SchoolSvc}