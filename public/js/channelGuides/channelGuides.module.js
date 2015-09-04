/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { ChannelGuideCtrl } from 'js/channelGuides/channelGuides.ctrl';
import { ChannelGuideSvc } from 'js/channelGuides/channelGuides.svc';

let channelGuideModule = angular.module('app.channelGuides', [])
    .factory('channelGuideSvc', ChannelGuideSvc.factory)
    .controller('channelGuideCtrl', ChannelGuideCtrl);

export default {channelGuideModule};
