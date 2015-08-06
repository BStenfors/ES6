/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SchoolCtrl {
    constructor (schoolSvc){
        this.schoolSvc = schoolSvc;
        this.init();
    }

    init(){

    }
}

SchoolCtrl.$inject = ['schoolSvc'];

export { SchoolCtrl }