/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class ChannelGuideCtrl {
    constructor (channelGuideSvc, schoolSvc, $scope, $mdThemingProvider){
        this.channelGuideSvc = channelGuideSvc;
        this.$mdThemingProvider = $mdThemingProvider;
        this.schoolSvc = schoolSvc;
        this.$scope = $scope;

        this.activeGuide = {};
        this.activeFootballGuide = {};
        this.activeBasketballGuide = {};
        this.schools = [];
        this.guides = [];
        this.init();
    }

    init(){
        let self = this;
        //this.getActiveChannelGuides();

        this.getSchools();
    }

    getSchools(){
        let schoolPromise = null;
        let self = this;
        schoolPromise = this.schoolSvc.getSchools(1);
        if(schoolPromise != null){
            schoolPromise.then(function(schools){
                self.schools = schools.data;
            });
        }
    }

    getActiveChannelGuides(){
        var self = this;
        let guidePromise = this.channelGuideSvc.getActiveChannelGuides();
        if(guidePromise != null) {
            guidePromise.then(function (guides) {
                self.guides = guides.data;
            });
        }
    }

    getActiveSchoolChannelGuide(schoolId){
        var self = this;
        let guidePromise = this.channelGuideSvc.getActiveChannelGuideByTypeSchoolId(1, schoolId);
        if(guidePromise != null){
            guidePromise.then(function(guide){
                self.activeGuide = guide.data;
            })
        }
    }

    getActiveSchoolFootballChannelGuide(schoolId){
        var self = this;
        let guidePromise = this.channelGuideSvc.getActiveChannelGuideByTypeSchoolId(1, schoolId);
        if(guidePromise != null){
            guidePromise.then(function(guide){
                self.activeFootballGuide = guide.data;
            })
        }
    }

    getActiveSchoolBasketballChannelGuide(schoolId){
        var self = this;
        let guidePromise = this.channelGuideSvc.getActiveChannelGuideByTypeSchoolId(2, schoolId);
        if(guidePromise != null){
            guidePromise.then(function(guide){
                self.activeBasketballGuide = guide.data;
            })
        }
    }
}

ChannelGuideCtrl.$inject = ['channelGuideSvc', 'schoolSvc', '$scope'];

export { ChannelGuideCtrl }