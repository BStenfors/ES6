/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class ChannelGuideSvc {
    constructor($http){
        this.$http = $http;
        this.channelGuideId = 0;
    }

    getChannelGuideId(){
        return this.channelGuideId;
    }
    setChannelGuideId(val){
        this.channelGuideId = val;
    }

    getActiveChannelGuideByTypeSchoolId(typeId, schoolId){
        let guide = null;
        guide = this.$http(
            {
                url: 'http://stage.services.collegesportsvision.com/api/pagecontent/GetActiveWeeklyChannelGuideByTypeBySchoolId',
                method: 'GET',
                params: {_id: typeId, _schoolId: schoolId}
            });
        return guide;

    }

    getActiveChannelGuides(){
        //http://stage.services.collegesportsvision.com/api/channelguide/GetActiveChannelGuideChannels
        let guides = null;
        guides = this.$http.get('http://stage.services.collegesportsvision.com/api/channelguide/GetActiveChannelGuideChannels');
        return guides;
    }

    getChannelGuideChannelsByChannelGuideId(guideId){
        let guides = null;
        guides = this.$http.get('http://stage.collegesportsvision.com/pagecontentservice.asmx/GetActiveWeeklyChannelGuideChannels?_weeklyChannelGuideId=' + guideId);
        return guides;
    }

    static factory($http){
        return new ChannelGuideSvc($http);
    }
}

ChannelGuideSvc.factory.$inject = ['$http'];

export {ChannelGuideSvc}