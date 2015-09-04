/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SchoolSvc {
    constructor($http){
        this.$http = $http;
        this.selectedConferenceId = 0;
    }

    getSelectedConferenceId(){
        return this.selectedConferenceId;
    }
    setSelectedConferenceId(val){
        this.selectedConferenceId = val;
    }



    getSchools(confId){
        //Get Schools By Conference
        //http://stage.services.collegesportsvision.com/api/schools/GetConferenceSchools/2
        let schools = null;
        if(typeof confId != 'undefined'){
            schools = this.$http.get('http://stage.services.collegesportsvision.com/api/schools/GetConferenceSchools/' + confId);
        }
        return schools;
    }

    getActiveChannelGuides(){
        //http://stage.services.collegesportsvision.com/api/channelguide/GetActiveChannelGuideChannels
        let guides = null;
        guides = this.$http.get('http://stage.services.collegesportsvision.com/api/channelguide/GetActiveChannelGuideChannels');
        return guides;
    }

    static factory($http){
        return new SchoolSvc($http);
    }
}

SchoolSvc.factory.$inject = ['$http'];

export {SchoolSvc}