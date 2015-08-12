/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SchoolCtrl {
    constructor (schoolSvc, $scope){
        this.schoolSvc = schoolSvc;
        this.schools = [];
        this.$scope = $scope;
        this.init();
    }

    init(){
        let self = this;
        this.getSchools();
        //this.$scope.$watch('this.schoolSvc.selectedConferenceId', function(current, old){
        //    self.getSchools(current);
        //})
        this.$scope.$watch(function(){return self.schoolSvc.getSelectedConferenceId()}, function(current, old){
           self.getSchools(current);
        });
    }

    getSchools(confId){
        var self = this;
        let schoolPromise = this.schoolSvc.getSchools(confId);
        if(schoolPromise != null) {
            schoolPromise.then(function (schools) {
                self.schools = schools.data;
            });
        }
    }
}

SchoolCtrl.$inject = ['schoolSvc', '$scope'];

export { SchoolCtrl }