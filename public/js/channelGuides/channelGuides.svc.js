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

    getActiveChannelGuides(){
        //http://stage.services.collegesportsvision.com/api/channelguide/GetActiveChannelGuideChannels
        let guides = null;
        guides = this.$http.get('http://stage.services.collegesportsvision.com/api/channelguide/GetActiveChannelGuideChannels');
        return guides;
    }

    static factory($http){
        return new ChannelGuideSvc($http);
    }
}

ChannelGuideSvc.factory.$inject = ['$http'];

export {ChannelGuideSvc}