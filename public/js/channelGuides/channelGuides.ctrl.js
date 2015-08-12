/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class ChannelGuideCtrl {
    constructor (channelGuideSvc, $scope){
        this.channelGuideSvc = channelGuideSvc;
        this.$scope = $scope;
        this.guides = [];
        this.init();
    }

    init(){
        let self = this;
        this.getActiveChannelGuides();
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
}

ChannelGuideCtrl.$inject = ['channelGuideSvc', '$scope'];

export { ChannelGuideCtrl }